import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import { fetchUsers, deleteUser } from "../Reducer/Actiontype/Actions";
import { deleteItemRequest, getItemsRequest } from "../ReduxSaga/Action/Action";
import { useNavigate, Link } from "react-router-dom";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { Dialog } from "primereact/dialog";

import { BsFiletypeCsv } from "react-icons/bs";
import { FiFilePlus } from "react-icons/fi";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { BsFileEarmarkPdf } from "react-icons/bs";
import ExcelJS from "exceljs";
// import { SiMicrosoftexcel } from "react-icons/si";
import { SiMicrosoftexcel } from "react-icons/si";
import { RiFileExcel2Fill } from "react-icons/ri";
// import { LuClipboardEdit } from "lucide-react";
import { MdOutlineEditCalendar } from "react-icons/md";
// import { LuClipboardEdit } from "react-icons/lu";
// import { SiMicrosoftoffice } from 'react-icons/si'; // Example replacement
import jsPDF from "jspdf";
import "jspdf-autotable";
import { TbFilterExclamation } from "react-icons/tb";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import "primeicons/primeicons.css";
// import { LuClipboardEdit } from "react-icons/lu";
import Loader from "../Loader/Loader";
import "./Register.css";

import { RiDeleteBin6Line } from "react-icons/ri";

const List = () => {
  const users = useSelector((state) => state.users);
  // const [dialogVisible, setDialogVisible] = useState(false);
  // const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState({});
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getItemsRequest());
      console.log("Fetching items from LocalStorage...", getItemsRequest);
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  

  const openNew = () => {
    navigate(`/foodregistration`);
  };

  const leftToolbarTemplate = () => {

    return (

      <div className="flex flex-wrap gap-2  ">
        <button
          label="New"
          className="border-none bg-none"
          severity="success"
          onClick={openNew}
        >
          <FiFilePlus className="text-primary fs-4" />
          {/* <FileOpen  /> */}
        </button>
        <button
          label="Delete"
          severity="danger"
          className="ms-2"
          onClick={confirmDelete}
          disabled={!selectedRows || selectedRows.length === 0}
        >
          <RiDeleteBin6Line className="text-danger fs-4" />
        </button>
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div className="">
        <button
          type="button"
          rounded
          onClick={() => exportCSV(false)}
          data-pr-tooltip="CSV"
        >
          <BsFiletypeCsv className="fs-4 text-warning" />
        </button>
        <button
          type="button"
          severity="success"
          className="ms-2"
          rounded
          onClick={exportToExcel}
          data-pr-tooltip="XLS"
        >
          <RiFileExcel2Fill className="fs-4 text-success" />
          {/* <SiMicrosoftexcel className="fs-4 text-success" /> */}
        </button>
        <button
          type="button"
          severity="warning"
          className="ms-2"
          rounded
          onClick={downloadPDF}
          data-pr-tooltip="PDF"
        >
          {" "}
          <BsFileEarmarkPdf className="fs-4 text-danger" />
        </button>
      </div>
    );
  };

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setGlobalFilter("");
  };

  const onGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value);
  };

  const confirmDelete = () => {
    setDeleteProductsDialog(true);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const deleteSelectedProducts = async () => {
    const deletedIds = [];
    for (const selectedRow of selectedRows) {
      try {
        await dispatch(deleteItemRequest(selectedRow.id));
        deletedIds.push(selectedRow.id);
      } catch (error) {
        console.error("Error deleting record:", error);
      }
    }
    const updatedData = users.filter(
      (rowData) => !deletedIds.includes(rowData.id)
    );
    setSelectedRows([]);
    toast.success("Deleted successfully!");
    setDeleteProductsDialog(false);
  };

  const deleteProductsDialogFooter = (
    <div className="confirmation-content">
      <button
        type="button"
        id="cancel-btn"
        className="  ms-2 fs-4 fw-bold text-light"
        onClick={hideDeleteProductsDialog}
      >
        <CloseIcon /> NO
      </button>
      <button
        type="button"
        className="btn btn-danger ms-2 fs-4 text-light"
        onClick={deleteSelectedProducts}
      >
        <CheckIcon /> YES
      </button>
    </div>
  );

  const header = () => {
    return (
      <div className="d-flex p-toolbar">
        <div>
          <h5 className="text-success">List Managing</h5>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="me-3 border border-1 rounded "
            onClick={handleReset}
          >
            Clear <TbFilterExclamation className="fs-4 text-success " />
          </button>
          <span className="p-input-icon-left">
            <i className="pi pi-search search-icons" />
            <InputText
              globalFilter={globalFilter}
              value={globalFilter}
              onChange={onGlobalFilterChange}
              placeholder="Global Search"
            />
          </span>
        </div>
      </div>
    );
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const deleteProduct = async () => {
    try {
      await dispatch(deleteItemRequest(product.id));
      setDeleteProductDialog(false);
      setProduct({});
      toast.success("Worker Deleted Successfully!");
    } catch (error) {
      console.error("Error deleting worker:", error);
      toast.error("Error deleting worker. Please try again later.");
    }
  };

  const handleRowSelect = (e) => {
    setSelectedRows(e.value);
  };

  const deleteProductDialogFooter = (
    <div className="confirmation-content">
      <button
        type="button"
        className="btn btn-primary bg-transparent ms-2 fs-4 fw-bold text-primary"
        onClick={hideDeleteProductDialog}
      >
        <CloseIcon /> NO
      </button>
      <button
        type="button"
        className="btn danger ms-2 fs-4 text-light"
        onClick={deleteProduct}
      >
        <CheckIcon /> YES
      </button>
    </div>
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="d-flex ">
        <button className="">
          <Link
            className=" text-light me-1 text-dark "
            to={`/edit/${rowData.id}/edit`}
          >
            {/* <LuClipboardEdit className="text-primary fs-4" /> */}
            <MdOutlineEditCalendar className="text-primary fs-4"/>
          </Link>
        </button>
        <button
          // icon="pi pi-trash"
          className=""
          // severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        >
          {" "}
          <RiDeleteBin6Line className="text-danger fs-4" />
        </button>
      </div>
    );
  };

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Workers");
    worksheet.columns = [
      { header: "Name", key: "name" },
      { header: "Email", key: "email" },
      { header: "PhoneNumber", key: "phoneNumber" },
      { header: "Address", key: "address" },
      { header: "Name of Business", key: "business" },
      { header: "food", key: "food" },
      { header: "Description", key: "description" },
      { header: "Address ", key: "addressTwo" },
      { header: "Date ", key: "date" },
    ];

    users.forEach((rowData) => {
      worksheet.addRow({
        name: rowData.name,
        email: rowData.email,
        phoneNumber: rowData.phoneNumber,
        address: rowData.address,
        business: rowData.business,
        food: rowData.food,
        description: rowData.description,
        addressTwo: rowData.addressTwo,
        date: rowData.date,
      });
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      const fileName = "Workers.xlsx";

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.autoTable({
      head: [
        [
          "Name",
          "Email",
          "Phone Number",
          "Address",
          "Name of Business",
          "Food",
          "Description",
          "Address",
          "Date",
        ],
      ],
      body: users.map((rowData) => [
        rowData.name,
        rowData.email,
        rowData.phoneNumber,
        rowData.address,
        rowData.business,
        rowData.food,
        rowData.description,
        rowData.addressTwo,
        rowData.date,
      ]),
    });

    doc.save("Workers.pdf");
  };

  const exportCSV = () => {
    if (dt.current) {
      dt.current.exportCSV();
    }
  };

  return (
    <div className="">
      <div className="container mt-5 pt-5 data-tab">
        <div className="">
          <Toolbar
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          ></Toolbar>
          {loading && <Loader />}
          <DataTable
            className="card   custom-data-table"
            ref={dt}
            value={users}
            selection={selectedRows}
            onSelectionChange={(e) => handleRowSelect(e)}
            dataKey="id"
            paginator
            rows={2}
            rowsPerPageOptions={[3, 16, 9, 15, 25]}
            // loading={loading}
            header={header()}
            globalFilter={globalFilter}
            emptyMessage="No records found"
          >
            <Column
              selectionMode="multiple"
              className="colmn"
              headerStyle={{}}
            ></Column>
            <Column
              field="name"
              header="Name"
              className="colmn"
              sortable
            ></Column>
            <Column
              field="email"
              header="Email"
              className="colmn"
              sortable
            ></Column>
            <Column
              field="phoneNumber"
              header="Ph No"
              className="colmn"
              sortable
            ></Column>
            <Column field="address" header="Address" sortable></Column>
            <Column
              field="business"
              header="Name of Business"
              className="colmn"
              sortable
            ></Column>
            <Column
              field="food"
              className="colmn"
              header="Food"
              sortable
            ></Column>
            <Column
              field="description"
              className="colmn"
              header="Description"
              sortable
            ></Column>
            <Column
              field="addressTwo"
              className="colmn"
              header="Address"
              sortable
            ></Column>
            <Column
              field="date"
              className="colmn"
              header="Date"
              sortable
            ></Column>
            <Column
              header="Action"
              body={actionBodyTemplate}
              className=" d-flex"
            ></Column>
          </DataTable>

          <Dialog
            visible={deleteProductsDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteProductsDialogFooter}
            onHide={hideDeleteProductsDialog}
          >
            <div className="confirmation-content">
              <WarningAmberOutlinedIcon className="text-danger" />
              <span className="ms-2 fs-4 ">
                Are you sure you want to delete the selected workers?
              </span>
            </div>
          </Dialog>

          <Dialog
            visible={deleteProductDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteProductDialogFooter}
            onHide={hideDeleteProductDialog}
          >
            <div className="confirmation-content">
              <WarningAmberOutlinedIcon className="text-danger" />
              <span className="ms-2 fs-4 ">
                Are you sure you want to delete {product.name}'s Details?
              </span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default List;


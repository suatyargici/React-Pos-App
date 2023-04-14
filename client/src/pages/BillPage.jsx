import { Button, Card, Table } from "antd";
import { useState } from "react";
import PrintBill from "../components/bills/PrintBill.jsx";
import Header from "../components/header/Header.jsx";
import { useQuery } from "react-query";
import axios from "axios";
const BillPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customer,setCustomer]= useState()

  const getBills = () => {
    return axios.get("http://localhost:5000/api/bills/get-all");
  };

  const { data } = useQuery("bills", getBills);
  console.log("data :>> ", data);

  const columns = [
    {
      title: "Müşteri Adı",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Telefon Numarası",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "Oluşturma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{text.substring(0, 10)}</span>;
      },
    },
    {
      title: "Ödeme Yöntemi",
      dataIndex: "paymentMode",
      key: "paymentMode",
    },
    {
      title: "Toplam Fiyat",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => {
        return <span>{text}₺</span>;
      },
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_,record) => {
        return (
          <Button
            type="link"
            className="pl-0"
            onClick={() => {
              setIsModalOpen(true);
              setCustomer(record)
            }}
          >
            Yazdır
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="mb-4 text-center text-4xl font-bold">Faturalar</h1>
        <Table
          dataSource={data?.data}
          columns={columns}
          bordered
          rowKey={"_id"}
          pagination={false}
          scroll={{
            x: 1000,
            y: 240,
          }}
        />
      </div>
      <PrintBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} customer={customer}/>
    </>
  );
};

export default BillPage;

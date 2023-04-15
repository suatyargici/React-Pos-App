import { Table } from "antd";
import { useTranslation, initReactI18next } from "react-i18next";
import Header from "../components/header/Header.jsx";
import { useQuery } from "react-query";
import axios from "axios";

const CustomerPage = () => {
  const getBills = () => {
    return axios.get("http://localhost:5000/api/bills/get-all");
  };

  const { data } = useQuery("bills", getBills);


  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];
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
      title: "İşlem Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{text.substring(0, 10)}</span>;
      },
    },
  ];

  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="mb-4 text-center text-4xl font-bold">
          {t("my-customers")}
        </h1>
        <Table
          dataSource={data?.data}
          columns={columns}
          bordered
          rowKey={"_id"}
          pagination={false}
        />
      </div>
    </>
  );
};

export default CustomerPage;

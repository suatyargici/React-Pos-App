import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Button, Form, Input, message, Modal } from "antd";
import "./style.css";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import Edit from "./Edit";

const Categories = ({ data, setFiltered }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("Tümü");
  const [form] = Form.useForm();

  const queryClient = useQueryClient();
  const onFinish = async (values) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/categories/add-category",
        values
      );
      message.success(data.message);
      form.resetFields();
      setIsAddModalOpen(false);
      queryClient.invalidateQueries("category");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
  const getProducts = () => {
    return axios.get(`http://localhost:5000/api/products/get-all`);
  };

  const { data: product } = useQuery("product", getProducts);
  useEffect(() => {
    if (categoryTitle === "Tümü") {
      setFiltered(product?.data);
    } else{
      setFiltered(
        product?.data?.filter((item) => item.category === categoryTitle)
      );
    }
  }, [categoryTitle, product, setFiltered]);
console.log('data :>> ', categoryTitle);
  return (
    <ul className="flex w-[200px] gap-4 text-lg md:flex-col">
      {data?.map((item) => (
        <li
          className="category-item"
          key={item._id}
          onClick={() => setCategoryTitle(item.title)}
        >
          <span>{item.title}</span>
        </li>
      ))}
      <li
        className="category-item !bg-purple-800 hover:opacity-90"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="md:text-2xl" />
      </li>
      <li
        className="category-item !bg-orange-800 hover:opacity-90"
        onClick={() => setIsEditModalOpen(true)}
      >
        <EditOutlined className="md:text-2xl" />
      </li>
      <Modal
        title="Yeni Kategori Ekle"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name="title"
            label="Kategori Ekle"
            rules={[
              { required: true, message: "Kategori Alanı Boş Geçilemez!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="mb-0 flex justify-end">
            <Button type="primary" htmlType="submit">
              Oluştur
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Edit
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        categories={data}
      />
    </ul>
  );
};

export default Categories;

import { Button, Form, Input, message, Modal, Table } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

const Edit = ({
  isEditModalOpen,
  setIsEditModalOpen,
  categories,
  setCategories,
}) => {
  const [editingRow, setEditingRow] = useState({});
  const queryClient = useQueryClient();

  const onFinish = (values) => {
    console.log(values);
    try {
      axios.put("http://localhost:5000/api/categories/update-category", {
        title: values.title,
        _id: editingRow._id,
      });
      message.success("Kategori başarıyla güncellendi.");
      setIsEditModalOpen(false);
      queryClient.invalidateQueries("category");
    } catch (error) {
      message.success("Bir şeyler yanlış gitti.");
      console.log(error);
    }
  };

  const deleteCategory = useMutation({
    mutationKey: "category",
    mutationFn: async (id) => {
      await axios.delete(
        `http://localhost:5000/api/categories/delete-category`,
        {
          data: {
            _id: id,
          },
        }
      );
      message.success("Kategori başarıyla silindi.");
      queryClient.invalidateQueries("category");
    },
  });
  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
      render: (_, record) => {
        if (record._id === editingRow._id) {
          return (
            <Form.Item className="mb-0" name="title">
              <Input defaultValue={record.title} />
            </Form.Item>
          );
        } else {
          return <p>{record.title}</p>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div>
            <Button
              type="link"
              onClick={() => setEditingRow(record)}
              className="pl-0"
            >
              Düzenle
            </Button>
            <Button type="link" htmlType="submit" className="text-gray-500">
              Kaydet
            </Button>
            <Button
              type="link"
              danger
             
              onClick={() => deleteCategory.mutate(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <Modal
      open={isEditModalOpen}
      title="Kategori İşlemleri"
      footer={false}
      onCancel={() => setIsEditModalOpen(false)}
    >
      <Form onFinish={onFinish}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowKey={"_id"}
        />
      </Form>
    </Modal>
  );
};

export default Edit;

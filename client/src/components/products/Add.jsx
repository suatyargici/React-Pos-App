import { Button, Form, Input, message, Modal, Select } from "antd";
import axios from "axios";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

const Add = ({ isAddModalOpen, setIsAddModalOpen, categories }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const onFinish = (values) => {
    console.log(values)
    try {
      axios.post("http://localhost:5000/api/products/add-product", values);
      form.resetFields();
      message.success("Ürün başarıyla eklendi.");
      queryClient.invalidateQueries("product");
      setIsAddModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title={t("add-new-product")}
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label={t("product-name")}
          rules={[{ required: true, message: "Ürün Adı Alanı Boş Geçilemez!" }]}
        >
          <Input placeholder="Ürün adı giriniz." />
        </Form.Item>
        <Form.Item
          name="img"
          label={t("product-img")}
          rules={[
            { required: true, message: "Ürün Görseli Alanı Boş Geçilemez!" },
          ]}
        >
          <Input placeholder="Ürün görseli giriniz." />
        </Form.Item>
        <Form.Item
          name="price"
          label={t("product-price")}
          rules={[
            { required: true, message: "Ürün Fiyatı Alanı Boş Geçilemez!" },
          ]}
        >
          <Input placeholder="Ürün fiyatı giriniz." />
        </Form.Item>
        <Form.Item
          name="category"
          label={t("product-select")}
          rules={[{ required: true, message: "Kategori Alanı Boş Geçilemez!" }]}
        >
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.title ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.title ?? "")
                .toLowerCase()
                .localeCompare((optionB?.title ?? "").toLowerCase())
            }
            options={categories}
          />
        </Form.Item>
        <Form.Item className="mb-0 flex justify-end">
          <Button type="primary" htmlType="submit">
         {t("creat")}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;

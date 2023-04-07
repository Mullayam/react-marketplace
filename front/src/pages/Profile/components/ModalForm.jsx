import React, { useContext } from "react";
import { Col, Form, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { VALIDATION_RULES } from "../../../helpers/ValidationRules";
import { AddNewProduct, EditProduct } from "../../../services/products";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../redux/slices/loaderSlice";
import { AuthContext } from "../../../services/user";
import toast from "react-hot-toast";
const AdditionalCheckBoxes = [
  {
    label: "Bill Available",
    name: "billAvailable",
  },
  {
    label: "In Warranty",
    name: "warranty",
  },
  {
    label: "Extra Accessories",
    name: "accessories",
  },
  {
    label: "Box Available",
    name: "boxAvailable",
  },
];

export default function ModalForm({ GetProducts, FormRef, selectedProduct }) {
  const { _id } = useContext(AuthContext);
  const dispatch = useDispatch();
  const handleModalSubmit = async (values) => {
    dispatch(setLoader(true));
    values.seller = _id;
    if (selectedProduct) {
      const ProductsData = await EditProduct(selectedProduct._id, values);
      if (ProductsData.success) {
        toast.success(ProductsData.message);
      } else {
        toast.error(ProductsData.message);
      }
      dispatch(setLoader(false));
    } else {
      const ProductsData = await AddNewProduct(values);
      if (ProductsData.success) {
        toast.success(ProductsData.message);
      } else {
        toast.error(ProductsData.message);
      }
      dispatch(setLoader(false));
    }
    GetProducts();
  };
  React.useEffect(() => {
    if (selectedProduct) {
      FormRef.current.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct]);

  return (
    <Form ref={FormRef} layout="vertical" onFinish={handleModalSubmit}>
      <Form.Item label="Name" name="name" rules={VALIDATION_RULES}>
        <Input type="text" />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={VALIDATION_RULES}
      >
        <TextArea type="text" />
      </Form.Item>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item label="Price" name="price" rules={VALIDATION_RULES}>
            <Input type="number" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="category" label="Category" rules={VALIDATION_RULES}>
            <select>
              <option value="Z" defaultValue>
                Choose Here
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Age" name="age" rules={VALIDATION_RULES}>
            <Input type="number" />
          </Form.Item>
        </Col>
      </Row>
      <div className="flex gap-10">
        {AdditionalCheckBoxes.map((checkBox, i) => (
          <Form.Item
            label={checkBox.label}
            name={checkBox.name}
            key={i}
            valuePropName="checked"
          >
            <Input
              onChange={(e) =>
                FormRef.current.setFieldsValue({
                  [checkBox.name]: e.target.checked,
                })
              }
              checked={FormRef.current
                ?.getFieldValue(checkBox.name)
                ?.toString()}
              type="checkbox"
            />
          </Form.Item>
        ))}
      </div>
      <div className="flex gap-5">
        <Form.Item label="Show Bids on Products" name="showBidsOnProducts">
          <Input
            type="checkbox"
            checked={FormRef.current?.getFieldValue("showBidsOnProducts")}
            onChange={(e) => {
              FormRef.current.setFieldsValue({
                showBidsOnProducts: e.target.checked,
              });
            }}
          />
        </Form.Item>
      </div>
    </Form>
  );
}

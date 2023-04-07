import React from "react";
import { Modal, Tabs } from "antd";
import ModalForm from "./ModalForm";
import Images from "./Images";

export default function ProductsModal({
  title,
  GetProducts,
  selectedProduct,
  showProductsModal,
  setProductsModal,
}) {
  const FormRef = React.useRef(null);
  const [selectedTab, setSelectedTab] = React.useState("1");
  return (
    <Modal
      title={title}
      centered={true}
      open={showProductsModal}
      onCancel={() => setProductsModal(false)}
      width={1000}
      okText="Save"
      onOk={() => {
        FormRef.current.submit();
      }}
      {...(selectedTab === "2" && { footer: false })}
    >
      <Tabs
        defaultActiveKey="1"
        activeKey={selectedTab}
        onChange={(key) => setSelectedTab(key)}
      >
        <items tab="Genral" key="1">
          <ModalForm
            GetProducts={GetProducts}
            selectedProduct={selectedProduct}
            FormRef={FormRef}
          />
        </items>
        <items tab="Images" key="2" disabled={!selectedProduct}>
          <Images
            setProductsModal={setProductsModal}
            GetProducts={GetProducts}
            selectedProduct={selectedProduct}
          />
        </items>
      </Tabs>
    </Modal>
  );
}

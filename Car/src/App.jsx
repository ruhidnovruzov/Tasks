import React, { useState, useEffect } from "react";
import { Modal, Select, Button } from "antd";

const { Option } = Select;

function App() {
  const [carTypes, setCarTypes] = useState([]);
  const [ownerEnum, setOwnerEnum] = useState([]);
  const [marka, setMarka] = useState([]);
  const [model, setModel] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCarType, setSelectedCarType] = useState(null);
  const [selectedOwnerEnum, setSelectedOwnerEnum] = useState(null);
  const [selectedMarka, setSelectedMarka] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [palleteNumber, setPalleteNumber] = useState("");
  const [filteredPalleteNumbers, setFilteredPalleteNumbers] = useState([]);
  const [selectedValuesText, setSelectedValuesText] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const fetchData = async () => {
        try {
          const myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${accessToken}`);

          const requestOptions = {
            method: "GET",
            headers: myHeaders,
          };

          const response1 = await fetch(
            "http://65.108.86.31:8080/sg/private/api/car-type",
            requestOptions
          );
          const data1 = await response1.json();
          setCarTypes(data1);

          const response2 = await fetch(
            "http://65.108.86.31:8080/sg/private/api/enums?type=OWNERSHIP_ENUM",
            requestOptions
          );
          const data2 = await response2.json();
          setOwnerEnum(data2);

          const response3 = await fetch(
            "http://65.108.86.31:8080/sg/private/api/car-brands",
            requestOptions
          );
          const data3 = await response3.json();
          setMarka(data3);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, []);

  useEffect(() => {
    if (selectedMarka) {
      const accessToken = localStorage.getItem("accessToken");

      const fetchModels = async () => {
        try {
          const myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${accessToken}`);

          const requestOptions = {
            method: "GET",
            headers: myHeaders,
          };

          const response = await fetch(
            `http://65.108.86.31:8080/sg/private/api/car-brand-models/by-brand/${selectedMarka}`,
            requestOptions
          );
          const data = await response.json();
          setModel(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchModels();
    }
  }, [selectedMarka]);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleCarTypeChange = (value) => {
    setSelectedCarType(value);
  };

  const handleOwnerEnumChange = (value) => {
    setSelectedOwnerEnum(value);
  };

  const handleMarkaChange = (value) => {
    setSelectedMarka(value);
  };

  const handleModelChange = (value) => {
    setSelectedModel(value);
    fetchFilteredPalleteNumbers(selectedCarType, selectedOwnerEnum, value);
  };

  const handlePalleteNumberChange = (value) => {
    if (value) {
      setPalleteNumber(value);
      fetchFilteredPalleteNumbers(
        selectedCarType,
        selectedOwnerEnum,
        selectedMarka,
        selectedModel,
        value
      );
    }
  };
  

  const fetchFilteredPalleteNumbers = async (carType, ownerEnum, model) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    const url = `http://65.108.86.31:8080/sg/private/api/car/filter-cars?brandModelId=${model}&carTypeId=${carType}&ownershipEnumId=${ownerEnum}`;

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setFilteredPalleteNumbers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOK = () => {
    setModalVisible(false);
    updateSelectedValuesText();
  };

  const updateSelectedValuesText = () => {
    const selectedCarTypeText = carTypes.find((type) => type.id === selectedCarType)?.name;
    const selectedOwnerEnumText = ownerEnum.find((enumItem) => enumItem.id === selectedOwnerEnum)?.name;
    const selectedMarkaText = marka.find((brand) => brand.id === selectedMarka)?.name;
    const selectedModelText = model.find((carModel) => carModel.id === selectedModel)?.name;

    const selectedValuesText = `${selectedCarTypeText}, ${selectedOwnerEnumText}, ${selectedMarkaText}, ${selectedModelText}, ${palleteNumber}`;

    setSelectedValuesText(selectedValuesText);
  };

  return (
    <div>
      <h1>Maşın seçimi</h1>
      <button onClick={showModal}>Choose car</button>
      <Modal
        title="Select Car Data"
        visible={modalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" onClick={handleOK}>
            OK
          </Button>,
        ]}
      >
        <Select
          style={{ marginBottom: "20px" }}
          defaultValue="Select Car Type"
          onChange={handleCarTypeChange}
        >
          {carTypes.map((carType, index) => (
            <Option key={index} value={carType.id}>
              {carType.name}
            </Option>
          ))}
        </Select>

        <Select
          style={{ marginBottom: "20px" }}
          defaultValue="Select Owner Type"
          onChange={handleOwnerEnumChange}
        >
          {ownerEnum.map((owner, index) => (
            <Option key={index} value={owner.id}>
              {owner.name}
            </Option>
          ))}
        </Select>

        <Select
          style={{ marginBottom: "20px" }}
          defaultValue="Select Car Brand"
          onChange={handleMarkaChange}
        >
          {marka.map((brand, index) => (
            <Option key={index} value={brand.id}>
              {brand.name}
            </Option>
          ))}
        </Select>

        <Select
          style={{ marginBottom: "20px" }}
          defaultValue="Select Car Model"
          onChange={handleModelChange}
        >
          {model.map((carModel, index) => (
            <Option key={index} value={carModel.id}>
              {carModel.name}
            </Option>
          ))}
        </Select>
        <Select
          style={{ marginBottom: "20px" }}
          placeholder="Select Pallete Number"
          onChange={handlePalleteNumberChange}
        >
          {filteredPalleteNumbers.map((item, index) => (
            <Option key={index} value={item.carPlateNumber}>
              {item.carPlateNumber}
            </Option>
          ))}
        </Select>
      </Modal>

      <div style={{ marginTop: "20px" }}>{selectedValuesText}</div>
    </div>
  );
}

export default App;

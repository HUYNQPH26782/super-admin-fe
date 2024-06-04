import React, { memo, useState } from "react";
import CardLayoutTemplate from "../../../components/layout-base/CardLayoutTemplate";
import FontAwesomeBase from "../../../components/font-awesome/FontAwesomeBase";
import { t } from "i18next";
import { Col, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import ButtonBase from "../../../components/button-base/ButtonBase";
import { JsonTokenApi } from "../../../api/developer/jsonToken.api";

function JsonTokenIndex() {
  
  const [textAreaValue, setTextAreaValue] = useState("");

  const [jsonShowDiv, setJsonShowDiv] = useState({});

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
  };

  const handleDecodeClick = () => {
    JsonTokenApi.decodeToken(textAreaValue).then((res) => {
      if (res.data) {
        setJsonShowDiv(res.data.data);
      }
    })
  };

  return (
    <>
      <Row className="justify-between" gutter={16}>
        <Col xxl={12} xl={24} sm={24} className="mt-8">
          <CardLayoutTemplate 
            title={() => (
              <>
                <FontAwesomeBase className="mr-2" iconName={"key"} /> {t("developer.jsonToken.title2")}
              </>
            )}
            className="w-full shadow-md min-h-full">
            <TextArea 
              placeholder="Token write in here..." 
              allowClear 
              className="h-64"
              value={textAreaValue} 
              onChange={handleTextAreaChange} 
            />
            <div className="grid grid-cols-1 justify-center items-center h-full p-4 md:p-2 xl:p-5">
              <div className="col-span-1 text-center">
                <ButtonBase onClick={handleDecodeClick}>Decode</ButtonBase>
              </div>
            </div>
          </CardLayoutTemplate>
        </Col>
        <Col xxl={12} xl={24} sm={24} className="mt-8">
          <CardLayoutTemplate 
            title={() => (
              <>
                <FontAwesomeBase className="mr-2" iconName={"key"} /> {t("developer.jsonToken.title")}
              </>
            )}
            className="w-full shadow-md min-h-full">
                <div className={`w-full min-h-64 p-8 border-2 ${jsonShowDiv ? 'border-sky-500' : 'border-red-500'}`}>
                  <pre className="whitespace-pre-wrap break-all">
                    {jsonShowDiv ? JSON.stringify(jsonShowDiv, null, 2) : "Token is not valid..."}
                  </pre>
                </div>
          </CardLayoutTemplate>
        </Col>
      </Row>
    </>
  );
}

export default memo(JsonTokenIndex);

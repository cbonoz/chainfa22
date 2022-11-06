import React, { useState } from "react";
import { Button, Input, Row, Col, Radio, Steps, Result } from "antd";
import { freightUrl, ipfsUrl, getExplorerUrl } from "../util";
import { EXAMPLE_FORM } from "../constants";
import { FileDrop } from "./FileDrop/FileDrop";
import { uploadFiles } from "../util/stor";
import { deployContract, validAddress } from "../contract/freightContract";

const { Step } = Steps;

function CreateFreight(props) {
  const [data, setData] = useState({ ...EXAMPLE_FORM });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  const updateData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const clear = () => {
    setError(undefined)
    setLoading(false)
    setResult(undefined)
  }

  const isValid = (data) => {
    return (
      data.name
    );
  };
  const isValidData = isValid(data);

  const create = async () => {
    setError(undefined);

    if (!isValidData) {
      setError("Please provide a name, description, valid address, and at least one file.");
      return;
    }

    setLoading(true);
    const body = { ...data };

    // Format files for upload.
    const files = body.files.map((x) => {
      return x;
    });

    let res = { ...data };

    try {
      // 1) deploy base contract with metadata,
      const contract = await deployContract(data.name, data.signerAddress);
      res["contract"] = contract;

      // 2) Upload files to moralis/ipfs,
      const metadata = await uploadFiles(
        files,
        data.name,
        data.description,
        data.signerAddress,
        contract.address
      );

      // 3) return shareable url.
      res["freightUrl"] = freightUrl(metadata.hash());
      res["hash"] = metadata.hash();
      res["contractUrl"] = getExplorerUrl(contract.address);

      // Result rendered after successful doc upload + contract creation.
      setResult(res);
      try {
        // await postPacket(res.freight request);
      } catch (e) {
        console.error("error posting freight request", e);
      }
    } catch (e) {
      console.error("error creating freight request", e);
    } finally {
      clear();
    }
  };

  const getStep = () => {
    if (!!result) {
      return 2;
    } else if (isValidData) {
      return 1;
    }
    return 0;
  };

  return (
    <div>
      <Row>
        <Col span={16}>
          <div className="create-form white boxed">
            <h2>Create new freight request</h2>
            <br />

            <h3 className="vertical-margin">Freight request name:</h3>
            <Input
              placeholder="Name of the freight request"
              value={data.name}
              prefix="Name:"
              onChange={(e) => updateData("name", e.target.value)}
            />

            {/* <TextArea
              aria-label="Description"
              onChange={(e) => updateData("description", e.target.value)}
              placeholder="Description of the freight request"
              prefix="Description"
              value={data.description}
            /> */}

            {/* TODO: add configurable amount of items */}
            <h3 className="vertical-margin">Upload image of parcel (Optional):</h3>
            <FileDrop
              files={data.files}
              setFiles={(files) => updateData("files", files)}
            />

            <Button
              type="primary"
              className="standard-button"
              onClick={create}
              disabled={loading} // || !isValidData}
              loading={loading}
            >
              Create freight request!
            </Button>
            {!error && !result && loading && (
              <span>&nbsp;Note this may take a few moments.</span>
            )}
            <br />
            <br />
            {error && <div className="error-text">{error}</div>}
            {result && (<div>
              <Result title="Created freight request!"/>
              <div>
                <a href={ipfsUrl(result.hash)} target="_blank">
                  View metadata
                </a>
                <br />
                <a href={result.contractUrl} target="_blank">
                  View created contract
                </a>
                <br />
                <p>
                  Share this url with the potential signer:
                  <br />
                  <a href={result.freightUrl} target="_blank">
                    Open freight url
                  </a>
                </p>
              </div>
              </div>
            )}
          </div>
        </Col>
        <Col span={1}></Col>
        <Col span={7}>
          <div className="white boxed">
            <Steps
              className="standard-margin"
              direction="vertical"
              size="small"
              current={getStep()}
            >
              <Step title="Fill in fields" description="Enter required data." />
              <Step
                title="Create freight record"
                description="Deploys a smart contract which will track the parcel"
              />
              <Step
                title="Use the QR code to monitor and provide updates to each parcel"
                description="Others can view and provide updates as the parcel is moved"
              />
            </Steps>
          </div>
        </Col>
      </Row>
    </div>
  );
}

CreateFreight.propTypes = {};

export default CreateFreight;

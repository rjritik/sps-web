import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import { Tabs, Tab } from "@heroui/tabs";
import { Button, Input } from "@heroui/react";

const AddUpdateBlocks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blockMarkerRefNumber = location.state?.blockMarkerRefNumber || "";
  console.log("blockMarkerRefNumber", blockMarkerRefNumber);

  const [selectedKey, setSelectedKey] = useState("step1");

  useEffect(() => {
    if (!blockMarkerRefNumber) {
      navigate("/quarry");
    }
  }, []);

  return (
    <DashboardLayout>
      {" "}
      <div>Add Update Quarry Blocks</div>
      <Tabs selectedKey={selectedKey} variant="underlined" onSelectionChange={setSelectedKey}>
        <Tab key="step1" title="Overview">
          <Input
            className="w-full"
            placeholder="Enter 8-character Ref Number"
          />
          <Input
            className="w-full"
            placeholder="Enter 8-character Ref Number"
          />
          <button onClick={<></>}>Next</button>
        </Tab>
        <Tab key="step2" title="Block Dimensions"></Tab>
        <Tab key="step3" title="Attachments"></Tab>
      </Tabs>
    </DashboardLayout>
  );
};

export default AddUpdateBlocks;

import {
  Button,
  Tooltip,
  Loading,
  Flex,
  Card,
  Typography,
  Alert,
  Steps,
  Input,
  Skeleton,
  SimpleTable,
  EmptyState,
  Divider,
  SecureCopy,
  Switcher,
  Pagination,
  Modal,
  Select,
  MultiSelect,
  SelectOption,
  Dropdown,
  Accordion,
  Tabs,
  PanelLayout,
  PanelHeader,
  PanelSidebar,
  Checkbox,
  PanelLayoutTypes,
  Popover,
  JsonViewer,
  Sidebar,
  SidebarItem,
  Texrarea,
  ThemeChanger,
  ThemeSwitcher,
} from "djuno-design";
import { useRef, useState } from "react";
import Header from "./Header";
import { ReactComponent as FaceSmile } from "./icons/face-smile.svg";
import { ReactComponent as Logo } from "./logo.svg";

const { Text, Title, Paragraph, Link } = Typography;
function App() {
  const [btnLoading, setBtnLoading] = useState(false);
  const handleClick = () => {
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 3000);
  };
  const [inputValue, setInputValue] = useState("");
  const [swith, setSwitch] = useState(false);

  // Pagination states
  const [offset, setOffset] = useState(0);
  const handlePageChange = (offset: number, limit: number) => {
    setOffset(offset);
  };
  const [modal, setModal] = useState(false);

  const selectOptions: SelectOption<string>[] = [
    { label: "option 1", value: "option1" },
    { label: "option 2", value: "option2" },
  ];
  const [clearableValue, setClearableValue] = useState<string | undefined>(
    selectOptions[0].value
  );
  const exampleJson = {
    block_number: 38733960,
    topic: "raw-avalanchec-mainnet",
    chain: "avalanchec-mainnet",
    block: {
      baseFeePerGas: "0x5f9ed8fd3",
      difficulty: "0x1",
      gasLimit: "0xe4e1c0",
      gasUsed: "0x46f0b1",
      hash: "0x42a9043d4a8b0d57a37dba1ec579aadca2bdeea44ec9383c05aae8d4b534abbc",
      miner: "0x0100000000000000000000000000000000000000",
      nonce: "0x0000000000000000",
      number: "0x24f0888",
      parentHash:
        "0x7a3654a7b66a5244c5993af3f8d49fb3c3ce68964485bbd589af6d9fa4ff33c1",
      size: "0x5ba6",
      timestamp: "0x6571aeb3",
      transactions: [
        {
          baseFeePerGas: "0x5f9ed8fd3",
          difficulty: "0x1",
          gasLimit: "0xe4e1c0",
          gasUsed: "0x46f0b1",
          hash: "0x42a9043d4a8b0d57a37dba1ec579aadca2bdeea44ec9383c05aae8d4b534abbc",
          miner: "0x0100000000000000000000000000000000000000",
          nonce: "0x0000000000000000",
          number: "0x24f0888",
          parentHash:
            "0x7a3654a7b66a5244c5993af3f8d49fb3c3ce68964485bbd589af6d9fa4ff33c1",
          size: "0x5ba6",
          timestamp: "0x6571aeb3",
          transactions: [],
        },
      ],
    },
  };

  const [open, setOpen] = useState<boolean>(false);
  const handleToggle = () => setOpen(!open);

  //sidebar
  const [sidebarLoading, setSidebarLoading] = useState(false);
  const [panelType, setPanelType] = useState<PanelLayoutTypes>("mini");
  const [pathname, setPathname] = useState<string>("/item1");
  const handleTogleSidebarLoading = () => {
    setSidebarLoading((prev) => !prev);
  };
  const handleToglePanelType = () => {
    setPanelType((prev) => (prev === "normal" ? "mini" : "normal"));
  };
  const handleChangePathname = () => {
    setPathname((prev) => (prev === "/item1" ? "/item2" : "/item1"));
  };

  const sidebarItems: SidebarItem[] = [
    {
      id: 1,
      label: "item1",
      activeCondition: {
        segmentIndex: 0,
        activeString: "item1",
      },
      onClick: (item) => console.log(item),
    },
    {
      id: 2,
      label: "item2",
      activeCondition: {
        segmentIndex: 0,
        activeString: "item2",
      },
      onClick: (item) => console.log(item),
    },
    {
      id: 3,
      label: "item3",
      activeCondition: {
        segmentIndex: 0,
        activeString: "item3",
      },
      link: "/item3",
      onClick: (item) => console.log(item?.link),
    },
  ];

  const [isChecked, setIsChecked] = useState(false);

  const [multiSelectValues, setMultiSelectValues] = useState<
    string[] | undefined
  >([selectOptions[0].value]);

  return (
    <div className="App min-h-screen w-screen flex flex-col bg-blue-50 dark:bg-[#101214]">
      <Header />
      <Flex direction="col" className="gap-7 mx-auto min-w-[500px] my-10 ">
        <Card title="Checkbox">
          <Flex direction="col" className="gap-5">
            <Flex className="gap-5 w-full">
              <Flex direction="col">
                <Checkbox
                  label="Djuno Design"
                  value={isChecked}
                  onChange={setIsChecked}
                />
              </Flex>
            </Flex>

            <Flex items="center" className="gap-5 w-full">
              <Checkbox
                label="Djuno Design"
                value={isChecked}
                onChange={setIsChecked}
                disabled
              />
            </Flex>
            <Flex items="center" className="gap-5 w-full">
              <Checkbox
                label="is required?"
                value={isChecked}
                onChange={setIsChecked}
                required
              />
            </Flex>
            <Flex items="center" className="gap-5 w-full">
              <Checkbox
                label="Djuno Design"
                value={isChecked}
                onChange={setIsChecked}
                tooltip={{ content: "it's a tooltip" }}
              />
            </Flex>
            <Flex items="center" className="gap-5 w-full">
              <Checkbox
                label="Djuno Design"
                value={isChecked}
                onChange={setIsChecked}
                error="error"
              />
            </Flex>
            <Flex items="center" className="gap-5 w-full">
              <Checkbox
                label="Djuno Design"
                value={isChecked}
                onChange={setIsChecked}
                error={true}
              />
            </Flex>
          </Flex>
        </Card>
        <Card title="Popover">
          <Flex direction="col" className="gap-5 w-full  mb-10">
            <Popover
              contentNode={
                <Input
                  inputProps={{
                    value: "djuno-design",
                  }}
                />
              }
              panelClassName="z-1000 min-w-600 max-w-600 whitespace-nowrap"
              panelStyle={{}}
            >
              <div className="w-40">
                <Button onClick={handleToggle}>Popover</Button>
              </div>
            </Popover>
          </Flex>
        </Card>
        <Card title="ThemeChanger">
          <Flex className="gap-5 w-full mt-5">
            <ThemeChanger />
            <ThemeSwitcher />
          </Flex>
        </Card>
        <Card title="Tabs">
          <Flex direction="col" className="gap-5 w-full">
            <Tabs
              listClassName="w-full mb-6"
              options={[
                {
                  label: "Djuno Design 1",
                },
                {
                  label: "Djuno Design 2",
                },
                {
                  label: "Djuno Design 3",
                },
              ]}
              tabType="creamy"
            />
          </Flex>
          <Flex direction="col" className="gap-5 w-full">
            <Tabs
              listClassName="w-full  mb-6"
              options={[
                {
                  label: "Djuno Design 1",
                },
                {
                  label: "Djuno Design 2",
                },
                {
                  label: "Djuno Design 3",
                },
              ]}
              tabType="default"
            />
          </Flex>
        </Card>
        <Card title="JsonViewer">
          <Flex direction="col" className="gap-5 w-full mt-5">
            <JsonViewer value={exampleJson} />
          </Flex>
        </Card>

        <Card title="Textarea">
          <Text size="sm" className="font-semibold ">
            Have hit:
          </Text>
          <Flex direction="col" className="gap-5 w-full mt-5">
            <Texrarea
              label="Textarea"
              placeholder="Enter custom notes if any"
              textareaProps={{ rows: 5, cols: 50, maxLength: 500 }}
              hint="Djuno Design"
            />
          </Flex>
          <Text size="sm" className="font-semibold mt-10">
            Simple form:
          </Text>
          <Flex className="gap-5 w-full mt-5">
            <Texrarea
              label="Textarea"
              placeholder="Enter custom notes if any"
              textareaProps={{}}
            />
            <Input label="Input" placeholder="Enter custom notes if any" />
          </Flex>
          <Text size="sm" className="font-semibold mt-10">
            Replace copy text.:
          </Text>
          <Flex className="gap-5 w-full mt-5">
            <Texrarea
              label="Textarea"
              placeholder=""
              textareaProps={{}}
              tooltip={{ content: "test" }}
            />
            <Input label="Input" placeholder="" tooltip={{ content: "test" }} />
          </Flex>
          <Text size="sm" className="font-semibold mt-10">
            Have error with error text:
          </Text>
          <Flex className="gap-5 w-full mt-5">
            <Texrarea
              label="Texrarea"
              placeholder="Enter custom notes if any"
              required
              error="field is required!"
            />
            <Input
              label="Input"
              placeholder="Enter custom notes if any"
              required
              error="field is required!"
            />
          </Flex>
          <Text size="sm" className="font-semibold mt-10">
            Copyable without function:
          </Text>
          <Flex className="gap-5 w-full mt-5">
            <Texrarea
              label="Texrarea"
              placeholder="Enter custom notes if any"
              copyable={true}
            />
            <Input
              label="Input"
              placeholder="Enter custom notes if any"
              copyable={true}
            />
          </Flex>
          <Text size="sm" className="font-semibold mt-10">
            Copyable with function:
          </Text>
          <Flex className="gap-5 w-full mt-5">
            <Texrarea
              label="Texrarea"
              placeholder="Enter custom notes if any"
              copyable={(v) => `Hi ${v}`}
            />
            <Input
              label="Input"
              placeholder="Enter custom notes if any"
              copyable={(v) => `Hi ${v}`}
            />
          </Flex>
          <Text size="sm" className="font-semibold mt-10">
            Have error without error text:
          </Text>
          <Flex className="gap-5 w-full mt-5">
            <Texrarea
              label="Texrarea"
              placeholder="Enter custom notes if any"
              error={true}
            />
            <Input
              label="Input"
              placeholder="Enter custom notes if any"
              error={true}
            />
          </Flex>
          <Text size="sm" className="font-semibold mt-10">
            Custom Copy icon and replace tooltips text:
          </Text>
          <Flex className="gap-5 w-full mt-5">
            <Texrarea
              label="Texrarea"
              placeholder="Enter custom notes if any"
              copyable={{
                icon: [<FaceSmile />, <FaceSmile className="text-green-500" />],
                tooltips: ["Click to copy", "Text copied!"],
              }}
            />
            <Input
              label="Input"
              placeholder="Enter custom notes if any"
              copyable={{
                icon: [<FaceSmile />, <FaceSmile className="text-green-500" />],
                tooltips: ["Click to copy", "Text copied!"],
              }}
            />
          </Flex>
          <Text size="sm" className="font-semibold mt-10">
            Hide Copy tooltips:
          </Text>
          <Flex className="gap-5 w-full mt-5">
            <Texrarea
              label="Texrarea"
              placeholder="Enter custom notes if any"
              copyable={{
                icon: [<FaceSmile />, <FaceSmile className="text-green-500" />],
                tooltips: false,
              }}
            />
            <Input
              label="Input"
              placeholder="Enter custom notes if any"
              copyable={{
                icon: [<FaceSmile />, <FaceSmile className="text-green-500" />],
                tooltips: false,
              }}
            />
          </Flex>
        </Card>

        <Card title="Pagination">
          <Flex direction="col" className="gap-5 w-full mt-5">
            <div className="flex justify-end mt-3">
              <Pagination
                limit={3}
                offset={offset}
                total={30}
                siblingCount={1}
                onPageChange={handlePageChange}
                loading={false}
                className="my-pagination-class"
              />
            </div>
          </Flex>
        </Card>

        <Card title="Accordion">
          <Flex direction="col" className="gap-5 w-full">
            handleChange
            <Accordion
              items={[
                {
                  label: "Filters",
                  panel: (
                    <div className="">
                      <Input
                        inputProps={{
                          value: "djuno-design",
                        }}
                      />
                    </div>
                  ),
                },
              ]}
            />
          </Flex>
        </Card>

        <Card
          title="Layout"
          description="PanelLayout - PanelSidebar - PanelHeader"
        >
          {/* <div className=""> */}
          <PanelLayout
            type="mini"
            pathname="/"
            style={{ height: 400 }}
            className="w-full border border-slate-500 overflow-hidden"
            renderSidebar={({ segments, ...sidebarProps }) => (
              <PanelSidebar
                {...sidebarProps}
                sidebarHeader={
                  <div className="flex items-center gap-1 px-1">
                    <Logo />
                    <Text size="xs">djuno-design</Text>
                  </div>
                }
              >
                <Text size="xs">sidebar</Text>
              </PanelSidebar>
            )}
            renderHeader={(headerProps) => (
              <PanelHeader {...headerProps} mobileIcon={<Logo />}>
                <Text size="xs">header</Text>
              </PanelHeader>
            )}
          >
            <iframe
              src="https://google.com"
              className="w-full h-96"
              title="djuno-design"
            />
          </PanelLayout>
          {/* </div> */}
        </Card>

        <Card
          title="Sidebar"
          setting={
            <Flex items="center" className="gap-4">
              <Flex items="center" className="gap-1">
                <Text size="xs">mini?</Text>
                <Switcher
                  onChange={handleToglePanelType}
                  value={panelType === "mini"}
                />
              </Flex>
              <Flex items="center" className="gap-1">
                <Text size="xs">change selected?</Text>
                <Switcher
                  onChange={handleChangePathname}
                  value={pathname === "/item2"}
                />
              </Flex>
              <Flex items="center" className="gap-1">
                <Text size="xs">Loading?</Text>
                <Switcher
                  onChange={handleTogleSidebarLoading}
                  value={sidebarLoading}
                />
              </Flex>
            </Flex>
          }
        >
          <Flex className="gap-5">
            <div className="h-96 w-60 border border-slate-400">
              <Sidebar
                type={panelType}
                items={sidebarItems}
                subItems={sidebarItems}
                segments={["item3"]}
                loading={sidebarLoading}
                loadingMode="skeleton"
              />
            </div>
            <div className="h-96 w-60 border border-slate-400">
              <Sidebar
                type={panelType}
                items={sidebarItems}
                segments={["item1"]}
                loading={sidebarLoading}
                loadingMode="elastic"
              />
            </div>
            <PanelLayout
              type={panelType}
              pathname={pathname}
              className="h-96 w-full border border-slate-500 overflow-hidden"
              renderSidebar={({ segments, isShowSidebar, type }) => (
                <PanelSidebar
                  isShowSidebar={isShowSidebar}
                  type={type}
                  sidebarHeader={
                    <div className="flex items-center gap-1 px-1">
                      <Logo />
                      <Text size="xs">djuno-design</Text>
                    </div>
                  }
                >
                  <Sidebar
                    type={type}
                    items={sidebarItems}
                    segments={segments}
                    loading={sidebarLoading}
                    loadingMode="skeleton"
                  />
                </PanelSidebar>
              )}
              renderHeader={(headerProps) => (
                <PanelHeader {...headerProps} mobileIcon={<Logo />}>
                  <Text size="xs">header</Text>
                </PanelHeader>
              )}
            >
              <iframe
                src="https://google.com"
                className="w-full h-96"
                title="djuno-design"
              />
            </PanelLayout>
          </Flex>
        </Card>

        <Card title="Modal">
          <Flex direction="col" className="gap-3">
            <Flex items={{ default: "center" }} className="gap-2">
              <Button onClick={() => setModal(true)}>Click to open!</Button>
              <Modal
                isOpen={modal}
                onClose={() => setModal(false)}
                title="Modal title"
                contentClassName="max-w-md"
              >
                <EmptyState />
              </Modal>
            </Flex>
          </Flex>
        </Card>
        <Card title="SecureCopy">
          <Flex direction="col" className="gap-5 w-full mt-5">
            <SecureCopy text="Djuno Design" type="hide" />
          </Flex>
          <Flex direction="col" className="gap-5 w-full mt-5">
            <SecureCopy text="Djuno Design" type="copy" />
          </Flex>
        </Card>

        <Card title="Dropdown">
          <Divider
            text=" Default dropdown"
            orientation="left"
            usingText={true}
          />
          <Flex direction="col" className="gap-5 w-full">
            <div className="h-full w-full inline-flex items-center justify-end gap-1 px-4">
              <div className="w-50 flex justify-center items-center">
                <Dropdown
                  title="djuno Design"
                  menu={[
                    {
                      key: "1",
                      label: "Edit",
                    },
                    {
                      type: "divider",
                    },
                    {
                      key: "end",
                      label: "Delete",
                      danger: true,
                    },
                  ]}
                  type="default"
                >
                  <div className=" p-2 rounded-md text-dark-900 bg-secondary-100  dark:text-secondary-100 dark:bg-dark-900 dark:hover:bg-dark-950 ">
                    Djuno Design
                  </div>
                </Dropdown>
              </div>
            </div>
          </Flex>
          <Divider
            text=" Simple dropdown"
            orientation="left"
            usingText={true}
          />
          <Flex direction="col" className="gap-5 w-full">
            <div className="h-full w-full inline-flex items-center justify-end gap-1 px-4">
              <div className="w-50 flex justify-center items-center">
                <Dropdown
                  title="djuno Design"
                  menu={[
                    {
                      key: "1",
                      label: "Edit",
                    },
                    {
                      type: "divider",
                    },
                    {
                      key: "end",
                      label: "Delete",
                      danger: true,
                    },
                  ]}
                  type="simple"
                >
                  <div className=" p-2 rounded-md text-dark-900 bg-secondary-100  dark:text-secondary-100 dark:bg-dark-900 dark:hover:bg-dark-950 ">
                    Djuno Design
                  </div>
                </Dropdown>
              </div>
            </div>
          </Flex>
        </Card>

        <Card title="Swither">
          <Flex direction="col" className="gap-5">
            <div>
              <Text>sizes:</Text>
              <Flex className="gap-5 w-full">
                <Flex direction="col">
                  <Text uiType="secondary" size="sm">
                    small
                  </Text>
                  <Switcher value={swith} onChange={setSwitch} size="small" />
                </Flex>
                <Flex direction="col">
                  <Text uiType="secondary" size="sm">
                    medium
                  </Text>
                  <Switcher value={swith} onChange={setSwitch} />
                </Flex>
                <Flex direction="col">
                  <Text uiType="secondary" size="sm">
                    large
                  </Text>
                  <Switcher value={swith} onChange={setSwitch} size="large" />
                </Flex>
              </Flex>
            </div>
            <div>
              <Text>disabled:</Text>
              <Flex items="center" className="gap-5 w-full">
                <Switcher value={swith} onChange={setSwitch} disabled />
              </Flex>
            </div>
            <div>
              <Text>loading:</Text>
              <Flex items="center" className="gap-5 w-full">
                <Switcher value={swith} onChange={setSwitch} loading />
              </Flex>
            </div>
          </Flex>
        </Card>

        <Card title="Inputs">
          <Flex direction="col" className="gap-5 w-full">
            <Flex items="end" className="gap-3 w-full flex justify-end">
              <Input label="small" size="small" />
              <Input label="medium" size="medium" />
              <Input label="large" size="large" />
            </Flex>
            <Flex items="end" className="gap-3 w-full flex justify-end">
              <Input label="loading" loading loadingType="elastic" />
            </Flex>
            <Flex items="end" className="gap-3 w-full flex justify-end">
              <Input
                label="copyable"
                copyable={(v) => `Hi ${v}`}
                inputProps={{
                  value: "djuno-design",
                }}
              />
            </Flex>
            <Flex items="end" className="gap-3 w-full flex justify-end">
              <Input
                label="error"
                loadingType="elastic"
                inputProps={{
                  value: inputValue,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    setInputValue(e.target?.value),
                }}
                error={inputValue === "" ? "Field is required" : ""}
              />
            </Flex>
            <Flex items="end" className="gap-3 w-full flex justify-end">
              <Input
                label="Input"
                copyable={{
                  icon: [
                    <FaceSmile />,
                    <FaceSmile className="text-green-500" />,
                  ],
                  tooltips: ["Click to copy", "Text copied!"],
                }}
              />
            </Flex>
            <Flex items="end" className="gap-3 w-full flex justify-end">
              <Input label="Input" tooltip={{ content: "I'm a tooltip" }} />
            </Flex>
          </Flex>
        </Card>

        <Card title="Select">
          <Flex direction="col" className="gap-5 w-full">
            <Flex items="end" className="gap-3 w-full flex justify-end">
              <Select
                label="small"
                size="small"
                options={selectOptions}
                className="w-[200px]"
                emptyString="select an option"
              />
              <Select
                label="medium"
                size="medium"
                options={selectOptions}
                className="w-[200px]"
              />
              <Select
                label="large"
                size="large"
                options={selectOptions}
                className="w-[200px]"
              />
            </Flex>
            <Flex items="end" className="gap-3 w-full flex justify-end">
              <Select
                label="loading"
                loading
                options={selectOptions}
                className="w-[200px]"
              />
            </Flex>
            <Flex items="end" className="gap-3 w-full flex justify-end">
              <Select
                label="clear"
                clearable
                value={clearableValue}
                options={selectOptions}
                onChange={(v) => {
                  console.log(v);
                  setClearableValue(v);
                }}
                className="w-[200px]"
              />
            </Flex>
            <Flex items="end" className="gap-3 w-full flex justify-end">
              <Select label="empty" options={[]} className="w-[200px]" />
            </Flex>
            <Flex items="end" className="gap-3 w-full flex justify-end">
              <Select
                label="tooltip"
                tooltip={{ content: "This is a tooltip", clickable: true }}
                options={[]}
                className="w-[200px]"
              />
            </Flex>
            <Flex items="end" className="gap-3 w-full flex justify-end">
              <Select
                label="error"
                error="Field is required"
                required
                options={[]}
                className="w-[200px]"
              />
            </Flex>
            <Flex items="end" className="gap-3 w-full flex justify-end">
              <Select
                label="error"
                error={true}
                options={[]}
                className="w-[200px]"
              />
            </Flex>
            <Flex items="end" className="gap-3 w-full flex justify-end">
              <MultiSelect
                label="multi select"
                clearable
                values={multiSelectValues}
                options={selectOptions}
                onChange={(v) => {
                  console.log(v);
                  setMultiSelectValues(v);
                }}
                className="w-[200px]"
              />
            </Flex>
          </Flex>
        </Card>

        <Card title="Skeleton">
          <Flex direction="col" className="gap-5 w-full">
            <Skeleton />
            <Skeleton size="small" />
            <Skeleton shape="square" />
            <Skeleton shape="circle" />
          </Flex>
        </Card>

        <Card title="Simple Table">
          <Text strong size="sm">
            Simple table with data
          </Text>
          <Flex className="gap-3 w-full">
            <SimpleTable className="gap-3 w-full">
              <SimpleTable.Head>
                <SimpleTable.Row>
                  <SimpleTable.TH>Header 1</SimpleTable.TH>
                  <SimpleTable.TH>Header 2</SimpleTable.TH>
                  <SimpleTable.TH>Header 3</SimpleTable.TH>
                </SimpleTable.Row>
              </SimpleTable.Head>
              <SimpleTable.Body>
                <SimpleTable.Row>
                  <SimpleTable.TD>Data 1</SimpleTable.TD>
                  <SimpleTable.TD>Data 2</SimpleTable.TD>
                  <SimpleTable.TD>Data 3</SimpleTable.TD>
                </SimpleTable.Row>
              </SimpleTable.Body>
            </SimpleTable>
          </Flex>
          <Text strong size="sm">
            Simple table with data and dropdown
          </Text>
          <Flex className="gap-3 w-full">
            <SimpleTable className="gap-3 w-full">
              <SimpleTable.Head>
                <SimpleTable.Row>
                  <SimpleTable.TH>Header 1</SimpleTable.TH>
                  <SimpleTable.TH>Header 2</SimpleTable.TH>
                  <SimpleTable.TH>Header 3</SimpleTable.TH>
                  <SimpleTable.TH></SimpleTable.TH>
                </SimpleTable.Row>
              </SimpleTable.Head>
              <SimpleTable.Body>
                <SimpleTable.Row>
                  <SimpleTable.TD>Data 1</SimpleTable.TD>
                  <SimpleTable.TD>Data 2</SimpleTable.TD>
                  <SimpleTable.TD>Data 3</SimpleTable.TD>
                  <SimpleTable.TD>
                    <div className="h-full w-full inline-flex items-center justify-end gap-1 px-4">
                      <div className=" flex justify-center items-center">
                        <Dropdown
                          title="djuno Design"
                          menu={[
                            {
                              key: "1",
                              label: "Edit",
                            },
                            {
                              type: "divider",
                            },
                            {
                              key: "end",
                              label: "Delete",
                              danger: true,
                            },
                          ]}
                          type="simple"
                        >
                          <div className=" p-2 rounded-md text-dark-900 bg-secondary-100  dark:text-secondary-100 dark:bg-dark-900 dark:hover:bg-dark-950 ">
                            Djuno Design
                          </div>
                        </Dropdown>
                      </div>
                    </div>
                  </SimpleTable.TD>
                </SimpleTable.Row>
              </SimpleTable.Body>
            </SimpleTable>
          </Flex>
          <Text strong size="sm">
            Simple table without data
          </Text>
          <Flex className="w-full">
            <SimpleTable className="gap-3 w-full">
              <SimpleTable.Head>
                <SimpleTable.Row>
                  <SimpleTable.TH>Header 1</SimpleTable.TH>
                  <SimpleTable.TH>Header 2</SimpleTable.TH>
                  <SimpleTable.TH>Header 3</SimpleTable.TH>
                </SimpleTable.Row>
              </SimpleTable.Head>
              <SimpleTable.Body>
                <SimpleTable.Row>
                  <SimpleTable.TD colSpan={3} className="text-center py-10">
                    <Flex className="w-full justify-center">
                      <EmptyState
                        text="No data available"
                        icon={<EmptyState.PRESENTED_IMAGE_SIMPLE />}
                      />
                    </Flex>
                  </SimpleTable.TD>
                </SimpleTable.Row>
              </SimpleTable.Body>
            </SimpleTable>
          </Flex>
        </Card>

        <Card title="Empty State">
          <Divider
            text=" Empty state with simple icon"
            orientation="left"
            usingText={true}
          />
          <Flex className="gap-3 w-full">
            <EmptyState
              text="Empty state"
              icon={<EmptyState.PRESENTED_IMAGE_SIMPLE />}
            />
          </Flex>
          <Divider
            text="Empty state with default icon"
            orientation="left"
            usingText={true}
          />
          <Flex className="gap-3 w-full">
            <EmptyState
              text="Empty state"
              icon={<EmptyState.PRESENTED_IMAGE_DEFAULT />}
            />
          </Flex>
          <Divider
            text="Empty state with undefined icon"
            orientation="left"
            usingText={true}
          />
          <Flex className="gap-3 w-full">
            <EmptyState text="Empty state" />
          </Flex>
          <Divider
            text="Empty state without icon"
            orientation="left"
            usingText={true}
          />
          <Flex className="gap-3 w-full">
            <EmptyState text="Empty state" usingIcon={false} />
          </Flex>
          <Divider
            text="Empty state without icon and with default text"
            orientation="left"
            usingText={true}
          />
          <Flex className="gap-3 w-full">
            <EmptyState usingIcon={false} />
          </Flex>
          <Divider
            text="Empty state without text"
            orientation="left"
            usingText={true}
          />
          <Flex className="gap-3 w-full">
            <EmptyState usingText={false} />
          </Flex>
        </Card>

        <Card title="Divider">
          <Flex className="gap-3 w-full">
            <Divider uiType="simple" />
          </Flex>
          <Flex className="gap-3 w-full">
            <Divider uiType="dashed" />
          </Flex>
          <Flex className="gap-3 w-full">
            <Divider uiType="dotted" />
          </Flex>
          <Flex className="gap-3 w-full">
            <Divider uiType="simple" usingText={true} />
          </Flex>
          <Flex className="gap-3 w-full">
            <Divider uiType="dashed" usingText={true} />
          </Flex>
          <Flex className="gap-3 w-full">
            <Divider uiType="dotted" usingText={true} text="Text" />
          </Flex>
          <Flex className="gap-3 w-full">
            <Divider uiType="dashed" usingText={true} orientation="left" />
          </Flex>
          <Flex className="gap-3 w-full">
            <Divider uiType="dotted" usingText={true} orientation="right" />
          </Flex>
        </Card>

        <Card title="Steps">
          <Flex direction={"col"} className="gap-3 w-full">
            <Steps
              steps={[
                { label: "label 1", value: "1" },
                { label: "label 2", value: "2" },
              ]}
              step="1"
            />
            <Steps
              steps={[
                { label: "label 1", value: "1" },
                { label: "label 2", value: "2" },
                { label: "label 3", value: "3" },
              ]}
              step="2"
            />
          </Flex>
        </Card>

        <Card title="Alert">
          <Flex direction={"col"} className="gap-3 w-full">
            <Text strong size="sm">
              basic usage
            </Text>
            <Alert message="Djuno Design. Neutral Alert" />
            <Alert type="info" message="Djuno Design. Info Alert" />
            <Alert type="warning" message="Djuno Design. Warning Alert" />
            <Alert type="success" message="Djuno Design. Success Alert" />
            <Alert type="error" message="Djuno Design. Error Alert" />
            <Text strong size="sm" className="mt-4">
              with description
            </Text>
            <Alert
              message={"Djuno Design. Alert with Description"}
              description="Error Description Error Description Error Description Error Description Error Description Error Description"
              type="info"
            />
            <Text strong size="sm" className="mt-4">
              with icon
            </Text>
            <Alert showIcon message="Djuno Design. Neutral Alert" />
            <Alert showIcon type="info" message="Djuno Design. Info Alert" />
            <Alert
              showIcon
              type="warning"
              message="Djuno Design. Warning Alert"
            />
            <Alert
              showIcon
              type="success"
              message="Djuno Design. Success Alert"
            />
            <Alert showIcon type="error" message="Djuno Design. Error Alert" />
            <Alert
              showIcon
              message="Djuno Design. Alert with Icon"
              description="Error Description Error Description Error Description Error Description Error Description Error Description"
              type="info"
            />
            <Text strong size="sm" className="mt-4">
              banner mode
            </Text>
            <Alert
              banner
              showIcon
              type="info"
              message="Djuno Design. Info Alert"
            />
          </Flex>
        </Card>

        <Card title="Typography" description="different types of heading">
          <Title>h1. Djuno Design</Title>
          <Title level={2}>h2. Djuno Design</Title>
          <Title level={3}>h3. Djuno Design</Title>
          <Title level={4}>h4. Djuno Design</Title>
          <Title level={5}>h5. Djuno Design</Title>
          <Title level={6}>h6. Djuno Design</Title>
        </Card>

        <Card title="Typography" description="different types of text">
          <Typography>
            <Flex direction="col" className="gap-2">
              <Text>Djuno Design (default)</Text>
              <Text uiType="secondary">Djuno Design (secondary)</Text>
              <Text uiType="success">Djuno Design (success)</Text>
              <Text uiType="warning">Djuno Design (warning)</Text>
              <Text uiType="danger">Djuno Design (danger)</Text>
              <Text uiType="disabled">Djuno Design (disabled)</Text>
              <Text mark>Djuno Design (mark)</Text>
              <Text code>Djuno Design (code)</Text>
              <Text underline>Djuno Design (underline)</Text>
              <Text del>Djuno Design (delete)</Text>
              <Text strong>Djuno Design (strong)</Text>
              <Text italic>Djuno Design (italic)</Text>
              <Link href="https://google.com" target="_blank">
                Djuno Design (link)
              </Link>
              <Text tooltip={{ content: "I'm a tooltip for <Typography/>" }}>
                Djuno Design (toottip)
              </Text>
              <Paragraph>Djuno Design (paragraph)</Paragraph>
            </Flex>
          </Typography>
        </Card>

        <Card title="Typography" description="different types of size">
          <Flex direction="col" className="gap-2">
            <Text size="xs">Djuno Design (xs)</Text>
            <Text size="sm">Djuno Design (sm)</Text>
            <Text size="base">
              Djuno Design (base)
              <Text size="xs" uiType="secondary">
                default
              </Text>
            </Text>
            <Text size="lg">Djuno Design (lg)</Text>
            <Text size="xl">
              Djuno Design (xl)
              <Text size="xs" uiType="secondary">
                Available until 9xl
              </Text>
            </Text>
          </Flex>
        </Card>

        <Card title="Typography" description="copyable options">
          <Flex direction={"col"} className="gap-3 w-full">
            <Paragraph copyable>This is a copyable text.</Paragraph>
            <Text copyable={{ text: "Hello, Djuno Design!" }}>
              Replace copy text.
            </Text>
            <Text
              copyable={{
                tooltips: ["click here", "you clicked!!"],
                icon: [<FaceSmile />, <FaceSmile className="text-green-500" />],
              }}
            >
              Custom Copy icon and replace tooltips text.
            </Text>
            <Text copyable={{ tooltips: false }}>Hide Copy tooltips.</Text>
          </Flex>
        </Card>

        <Card title="Card">
          <Card title="Title" description="description" setting="setting">
            content
          </Card>
        </Card>

        <Card title="Flex">
          <Flex direction="col" className="gap-2 dj-w-full">
            <Flex items="center" className="gap-2 dj-w-full">
              <Button>1</Button>
              <Button>2</Button>
              <Button>3</Button>
            </Flex>
            <Flex justify="center" items="center" className="gap-2 dj-w-full">
              <Button>1</Button>
              <Button>2</Button>
              <Button>3</Button>
            </Flex>
            <Flex justify="end" items="center" className="gap-2 dj-w-full">
              <Button>1</Button>
              <Button>2</Button>
              <Button>3</Button>
            </Flex>
            <Flex direction="col" items="start" className="gap-2 dj-w-full">
              <Button>1</Button>
              <Button>2</Button>
              <Button>3</Button>
            </Flex>
          </Flex>
        </Card>

        <Card title="Loading">
          <Flex items="center" className="gap-7 pl-3">
            <Flex items="center" className="gap-2">
              <Text size="sm">simple</Text>
              <Loading />
            </Flex>
            <Flex items="center" className="gap-2">
              <Text size="sm">cutoff</Text>
              <Loading type="cutoff" />
            </Flex>
            <Flex items="center" className="gap-2">
              <Text size="sm">elastic</Text>
              <Loading type="elastic" borderSize={1.5} />
            </Flex>
          </Flex>
        </Card>

        <Card title="Tooltip">
          <Flex className="gap-4 pl-3">
            <Tooltip content="I'm a tooltip">
              <Text size="sm">Tooltip</Text>
            </Tooltip>
            <Tooltip content="I'm a tooltip" theme="black" place="top">
              <Text size="sm">Tooltip</Text>
            </Tooltip>
            <Tooltip
              content={
                <>
                  I'm an{" "}
                  <a href="https://djuno.io" target="_blank" rel="noreferrer">
                    error
                  </a>{" "}
                  tooltip
                </>
              }
              clickable
              theme="error"
              place="right"
            >
              <Text size="sm">ClickableErrorTooltip</Text>
            </Tooltip>
          </Flex>
        </Card>

        <Card title="Button">
          <Flex direction="col" className="gap-3">
            <Flex items={{ default: "center" }} className="gap-2">
              <Button>Default</Button>
              <Button
                uiType="primary"
                loading={btnLoading}
                loadingType="elastic"
                onClick={handleClick}
              >
                Primary
              </Button>
              <Button uiType="light">Light</Button>
              <Button uiType="danger">Danger</Button>
            </Flex>
            <Flex items="center" className="gap-2">
              <Button disabled>Default</Button>
              <Button
                uiType="primary"
                loading={btnLoading}
                onClick={handleClick}
                disabled
              >
                Primary
              </Button>
              <Button uiType="light" disabled>
                Light
              </Button>
              <Button uiType="danger" disabled>
                Danger
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </div>
  );
}
export default App;

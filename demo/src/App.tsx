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
  Textarea,
  ThemeChanger,
  ThemeSwitcher,
  Tag,
  CodeViewer,
  Countdown,
  Combobox,
  ComboboxOption,
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
  const [textareaValue, setTextareaValue] = useState("");
  const [swith, setSwitch] = useState(false);

  // Pagination states
  const [offset, setOffset] = useState(0);
  const handlePageChange = (offset: number, limit: number) => {
    setOffset(offset);
  };
  const [modal, setModal] = useState(false);

  const selectOptions: SelectOption<{ name: string }>[] = [
    { label: "option 1", value: "option1", extraData: { name: "1" } },
    { label: "option 2", value: "option2", extraData: { name: "2" } },
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

  //panelLayout
  const [globalLoading, setGlobalLoading] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);

  //sidebar
  const [sidebarLoading, setSidebarLoading] = useState(false);
  const [panelType, setPanelType] = useState<PanelLayoutTypes>("mini");
  const [pathname, setPathname] = useState<string>("/sub-item1");
  const [sidebarActive, setSidebarActive] = useState(true);
  const handleTogleSidebarActive = () => {
    setSidebarActive((prev) => !prev);
  };
  const handleTogleSidebarLoading = () => {
    setSidebarLoading((prev) => !prev);
  };
  const handleToglePanelType = () => {
    setPanelType((prev) => (prev === "normal" ? "mini" : "normal"));
  };
  const handleChangePathname = () => {
    setPathname((prev) => (prev === "/sub-item1" ? "/item1" : "/sub-item1"));
  };

  const sidebarItems: SidebarItem[] = [
    {
      id: 1,
      label: "item1",
      activeConditions: [
        {
          index: 0,
          value: "item1",
        },
      ],
      icon: FaceSmile,
    },
    {
      id: 2,
      label: "item2",
      activeConditions: [
        {
          index: 0,
          value: "item2",
        },
      ],
      children: [
        {
          id: "2-0",
          label: "item2-0",
          activeConditions: [
            {
              index: 1,
              value: "item2-0",
            },
          ],
        },
        {
          id: "2-1",
          label: "item2-1",
          activeConditions: [
            {
              index: 1,
              value: "item2-1",
            },
          ],
          children: [
            {
              id: "2-1-0",
              label: "item2-1-0",
              activeConditions: [
                {
                  index: 2,
                  value: "item2-1-0",
                },
              ],
            },
            {
              id: "2-1-1",
              label: "item2-1-1",
              activeConditions: [
                {
                  index: 2,
                  value: "item2-1-1",
                },
              ],
              children: [],
            },
          ],
        },
        {
          id: "2-2",
          label: "item2-2",
          activeConditions: [
            {
              index: 1,
              value: "item2-2",
            },
          ],

          children: [
            {
              id: "2-2-0",
              label: "item2-2-0",
              activeConditions: [
                {
                  index: 2,
                  value: "item2-2-0",
                },
              ],
              isVisible: sidebarActive,
            },
            {
              id: "2-2-1",
              label: "item2-2-1",
              activeConditions: [
                {
                  index: 2,
                  value: "item2-2-1",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      label: "item3",
      activeConditions: [
        {
          index: 0,
          value: "item3",
        },
      ],
      link: "/item3",
      children: [
        {
          id: "3-0",
          label: "item3-0",
          activeConditions: [
            {
              index: 1,
              value: "item3-0",
            },
          ],
        },
        {
          id: "3-1",
          label: "item3-1",
          activeConditions: [
            {
              index: 1,
              value: "item3-1",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      label: "item4",
      isVisible: sidebarActive,
    },
  ];

  const sidebarSubItems: SidebarItem[] = [
    {
      id: 1,
      label: "sub-item1",
      activeConditions: [
        {
          index: 0,
          value: "sub-item1",
        },
        {
          index: 1,
          value: undefined,
        },
      ],
    },
    {
      id: 2,
      label: "sub-item2",
      activeConditions: [
        {
          index: 1,
          value: "sub-item2",
        },
      ],
    },
    {
      id: 3,
      label: "sub-item3",
      isVisible: false,
    },
  ];

  const [isChecked, setIsChecked] = useState(false);

  const [multiSelectValues, setMultiSelectValues] = useState<
    string[] | undefined
  >([selectOptions[0].value]);

  const tabOptions = [
    { label: "Tab 1", url: "/tab1" },
    { label: "Tab 2", url: "/tab2" },
    { label: "Tab 3", url: "/tab3" },
  ];

  const countdownRef1 = useRef<any>();
  const countdownRef2 = useRef<any>();

  const resetCountdown = () => {
    if (countdownRef1.current) {
      countdownRef1.current.resetCountdown();
    }
    if (countdownRef2.current) {
      countdownRef2.current.resetCountdown();
    }
  };

  const comboOptions: ComboboxOption[] = [
    { label: "option 1", value: "option 1" },
    {
      label: (
        <Flex items="center" className="gap-0.5">
          <FaceSmile className="w-4 h-4" />
          option 2
        </Flex>
      ),
      value: "option 2",
    },
    { label: "city 1", value: "city 1" },
    { label: "city 2", value: "city 2" },
    { label: "country 1", value: "country 1" },
  ];
  const [comboValue, setComboValue] = useState<undefined | string>();
  const [comboQuery, setComboQuery] = useState<undefined | string>();

  return (
    <div className="App min-h-screen w-screen flex flex-col bg-blue-50 dark:bg-[#101214]">
      <Header />
      <Flex
        direction="col"
        className="gap-7 mx-auto my-10 w-[500px] lg:w-[700px]" // min-w-[500px] max-w-2xl
      >
        <Card title="Combobox">
          <Flex className="gap-5 w-full">
            <Flex className="gap-3">
              <Combobox
                label="Combobox"
                uiSize="medium"
                options={comboOptions}
                className="w-[200px]"
                placeholder="Select an option"
                loading={false}
                clearable
                value={comboValue}
                onChange={(v) => {
                  setComboQuery(v);
                  setComboValue(v);
                }}
                query={comboQuery}
                onChangeQuery={(v) => {
                  setComboQuery(v);
                }}
                clearQueryOnClose={false}
              />
            </Flex>
            <Flex className="gap-3">
              <Combobox
                label="Combobox with style"
                uiSize="medium"
                options={comboOptions}
                className="w-[200px]"
                placeholder="Select an option"
                loading={false}
                clearable
                value={comboValue}
                onChange={(v) => {
                  setComboQuery(v);
                  setComboValue(v);
                }}
                query={comboQuery}
                onChangeQuery={(v) => {
                  setComboQuery(v);
                }}
                clearQueryOnClose={false}
                inputStyle={{ backgroundColor: "yellow" }}
              />
            </Flex>
            <Typography.Text>value: {comboValue}</Typography.Text>
            <Typography.Text>query: {comboQuery}</Typography.Text>
          </Flex>
        </Card>

        <Card title="CodeViewer">
          <Flex direction="col" className="gap-10 w-full">
            <Flex direction="col" className="w-full">
              <Divider text="default code view" />
              <CodeViewer
                copyable
                language="javascript"
                code={`<Popover
  contentNode={<Input value="djuno-design" />}
  panelClassName="z-1000 min-w-600 max-w-600 whitespace-nowrap"
  panelStyle={{}}
  >
    <div className="w-40">
        <Button onClick={handleToggle}>Popover</Button>
    </div>
</Popover>`}
              />
            </Flex>

            <Flex direction="col" className="w-full">
              <Divider text="manual theme" />
              <CodeViewer
                theme="dark"
                language="shell"
                copyable
                code={`yarn add djuno-design --save`}
              />
            </Flex>

            <Flex direction="col" className="w-full">
              <Divider text="transparent background" />
              <CodeViewer
                language="javascript"
                wrapLongLines
                showLineNumbers
                bgTransparent
                code={`import React from "react";
import uniquePropHOC from "./lib/unique-prop-hoc";

// this comment is here to demonstrate an extremely long line length, well beyond what you should probably allow in your own code, though sometimes you'll be highlighting code you can't refactor, which is unfortunate but should be handled gracefully

class Expire extends React.Component {
    constructor(props) {
        super(props);
        this.state = { component: props.children }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                component: null
            });
        }, this.props.time || this.props.seconds * 1000);
    }
    render() {
        return this.state.component;
    }
}

export default uniquePropHOC(["time", "seconds"])(Expire);`}
              />
            </Flex>
          </Flex>
        </Card>

        <Card
          title="Countdown"
          setting={<Button onClick={resetCountdown}>Reset</Button>}
        >
          <Flex direction="col" className="gap-5">
            <Flex className="gap-2 w-full">
              <Countdown ref={countdownRef1} seconds={5}>
                <div className="flex items-center gap-1">Resend</div>
              </Countdown>
            </Flex>
            <Flex className="gap-2 w-full">
              <Countdown
                ref={countdownRef2}
                seconds={10}
                className="flex-col"
                timerPosition="end"
                timerRender={({ formatedTime, timeLeft }) => {
                  if (timeLeft === 0) return null;
                  return (
                    <Text className="text-sm">
                      Resend after {formatedTime} seconds
                    </Text>
                  );
                }}
              >
                {({ disabled }) => (
                  <Button disabled={disabled}>Resend verification email</Button>
                )}
              </Countdown>
            </Flex>
          </Flex>
        </Card>

        <Card title="Tag">
          <Flex direction="col" className="gap-5">
            <Flex direction="col" className="gap-2 w-full">
              <Tag>Default Tag</Tag>
              <Tag icon={<FaceSmile className="w-4 h-4" />}>Icon Tag</Tag>
              <Tag closable>Closable Tag</Tag>
            </Flex>
            <Flex className="gap-2 w-full">
              <Tag color="processing">processing</Tag>
              <Tag color="success">success</Tag>
              <Tag color="error">error</Tag>
              <Tag color="warning">warning</Tag>
            </Flex>
            <Flex className="gap-2 w-full">
              <Tag bordered={false}>borderless tag</Tag>
              <Tag color="processing" bordered={false}>
                borderless tag
              </Tag>
            </Flex>
          </Flex>
        </Card>

        <Card title="Checkbox">
          <Flex direction="col" className="gap-5">
            <Flex className="gap-5 w-full">
              <Flex direction="col">
                <Checkbox
                  label="Ckeckbox simple form"
                  value={isChecked}
                  onChange={setIsChecked}
                />
              </Flex>
            </Flex>

            <Flex items="center" className="gap-5 w-full">
              <Checkbox
                label="Ckeckbox disabled form"
                value={isChecked}
                onChange={setIsChecked}
                disabled
              />
            </Flex>
            <Flex items="center" className="gap-5 w-full">
              <Checkbox
                label="Ckeckbox required form"
                value={isChecked}
                onChange={setIsChecked}
                required
              />
            </Flex>
            <Flex items="center" className="gap-5 w-full">
              <Checkbox
                label="Ckeckbox with tooltip"
                value={isChecked}
                onChange={setIsChecked}
                tooltip={{ content: "it's a tooltip" }}
              />
            </Flex>
            <Flex items="center" className="gap-5 w-full">
              <Checkbox
                label="Ckeckbox with text error"
                value={isChecked}
                onChange={setIsChecked}
                error="error"
              />
            </Flex>
            <Flex items="center" className="gap-5 w-full">
              <Checkbox
                label="Ckeckbox with error"
                value={isChecked}
                onChange={setIsChecked}
                error={true}
              />
            </Flex>

            <Flex className="gap-5 w-full">
              <Flex direction="col">
                <Checkbox
                  label="Ckeckbox simple form with style"
                  value={isChecked}
                  onChange={setIsChecked}
                  labelStyle={{
                    color: "green",
                  }}
                />
              </Flex>
            </Flex>
          </Flex>
        </Card>

        <Card title="Popover">
          <Flex direction="col" className="gap-5 w-full mb-10">
            <Popover
              content={<Input value="djuno-design" />}
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
                  element: <div>Content for Tab 1</div>,
                },
                {
                  label: "Djuno Design 2",
                  element: <div>Content for Tab 2</div>,
                },
                {
                  label: "Djuno Design 3",
                  element: <div>Content for Tab 3</div>,
                  // active: true,
                },
              ]}
              tabType="creamy"
            />
          </Flex>
          <Flex direction="col" className="gap-5 w-full mt-6">
            <Tabs
              listClassName="w-full  mb-6"
              options={[
                {
                  label: "Djuno Design 1",
                  element: <div>Content for Tab 1</div>,
                },
                {
                  label: "Djuno Design 2",
                  element: <div>Content for Tab 2</div>,
                },
                {
                  label: "Djuno Design 3",
                  element: <div>Content for Tab 3</div>,
                  isVisible: false,
                },
              ]}
              tabType="default"
            />
          </Flex>
          <Flex direction="col" className="gap-5 w-full ">
            <Tabs
              options={tabOptions}
              onChange={(i) => console.log(i)}
              listClassName="mt-6"
            />
          </Flex>
        </Card>

        <Card title="JsonViewer">
          <Flex direction="col" className="gap-5 w-full mt-5">
            <JsonViewer value={exampleJson} />
          </Flex>
          <Flex direction="col" className="gap-5 w-full mt-5">
            <JsonViewer value={exampleJson} collapsed={1} copyable={true} />
          </Flex>
        </Card>

        <Card title="Textarea">
          <Text size="sm" className="font-semibold">
            Have hit:
          </Text>
          <Flex direction="col" className="gap-5 w-full mt-5">
            <Textarea
              label="Textarea"
              placeholder="Enter custom notes if any"
              hint="Djuno Design"
            />
          </Flex>

          <Divider
            text="Simple form"
            textClassName="!text-sm"
            className="!mt-6 !mb-2"
          />
          <Flex className="gap-5 w-full">
            <Textarea
              label="Textarea"
              placeholder="Enter custom notes if any"
            />
            <Input label="Input" placeholder="Enter custom notes if any" />
          </Flex>

          <Divider
            text="Have loading"
            textClassName="!text-sm"
            className="!mt-6 !mb-2"
          />
          <Flex className="gap-5 w-full">
            <Textarea
              label="Textarea"
              placeholder="Enter custom notes if any"
              loading
              loadingType="elastic"
            />
            <Input label="loading" loading loadingType="elastic" />
          </Flex>

          <Divider
            text="Have error with error text"
            textClassName="!text-sm"
            className="!mt-6 !mb-2"
          />
          <Flex className="gap-5 w-full">
            <Textarea
              label="Textarea"
              loadingType="elastic"
              value={textareaValue}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setTextareaValue(e.target.value)
              }
              error={textareaValue === "" ? "Field is required" : ""}
            />
            <Input
              label="Input"
              loadingType="elastic"
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
              error={inputValue === "" ? "Field is required" : ""}
            />
          </Flex>

          <Divider
            text="Copyable (copy current value)"
            textClassName="!text-sm"
            className="!mt-6 !mb-2"
          />
          <Flex className="gap-5 w-full mt-5">
            <Textarea
              label="Texrarea"
              placeholder="Enter custom notes if any"
              copyable
            />
            <Input
              label="Input"
              placeholder="Enter custom notes if any"
              copyable
            />
          </Flex>

          <Divider
            text="Copyable with custom text"
            textClassName="!text-sm"
            className="!mt-6 !mb-2"
          />
          <Flex className="gap-5 w-full mt-5">
            <Textarea
              label="Texrarea"
              placeholder="Enter custom notes if any"
              copyable={{ text: "This is a custom text for textarea" }}
            />
            <Input
              label="Input"
              placeholder="Enter custom notes if any"
              copyable={{ text: "This is a custom text for input" }}
            />
          </Flex>

          <Divider
            text="Copyable with custom text function"
            textClassName="!text-sm"
            className="!mt-6 !mb-2"
          />
          <Flex className="gap-5 w-full mt-5">
            <Textarea
              label="Texrarea"
              placeholder="Enter custom notes if any"
              copyable={{
                text: ({ value }) => `Hi ${value}`,
              }}
            />
            <Input
              label="Input"
              placeholder="Enter custom notes if any"
              copyable={{
                text: (v) => `Hi ${v || ""}`,
              }}
            />
          </Flex>

          <Divider
            text="Have error without error text"
            textClassName="!text-sm"
            className="!mt-6 !mb-2"
          />
          <Flex className="gap-5 w-full mt-5">
            <Textarea
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

          <Divider
            text="Custom Copy icon and replace tooltips text"
            textClassName="!text-sm"
            className="!mt-6 !mb-2"
          />
          <Flex className="gap-5 w-full mt-5">
            <Textarea
              label="Texrarea"
              placeholder="Enter custom notes if any"
              copyable={{
                icons: [
                  <FaceSmile />,
                  <FaceSmile className="text-green-500" />,
                ],
                tooltips: ["Click to copy", "Text copied!"],
              }}
            />
            <Input
              label="Input"
              placeholder="Enter custom notes if any"
              copyable={{
                icons: [
                  <FaceSmile />,
                  <FaceSmile className="text-green-500" />,
                ],
                tooltips: ["Click to copy", "Text copied!"],
              }}
            />
          </Flex>

          <Divider
            text="Hide Copy tooltips"
            textClassName="!text-sm"
            className="!mt-6 !mb-2"
          />
          <Flex className="gap-5 w-full mt-5">
            <Textarea
              label="Texrarea"
              placeholder="Enter custom notes if any"
              copyable={{
                icons: [
                  <FaceSmile />,
                  <FaceSmile className="text-green-500" />,
                ],
                tooltips: false,
              }}
            />
            <Input
              label="Input"
              placeholder="Enter custom notes if any"
              copyable={{
                icons: [
                  <FaceSmile />,
                  <FaceSmile className="text-green-500" />,
                ],
                tooltips: false,
              }}
            />
          </Flex>
        </Card>

        <Card title="Pagination">
          <Flex direction="col" className="gap-5 w-full mt-5">
            <div className="flex  mt-3">
              <Pagination
                limit={3}
                offset={offset}
                total={30}
                siblingCount={1}
                onPageChange={handlePageChange}
                loading={false}
              />
            </div>
          </Flex>
          <Flex direction="col" className="gap-5 w-full mt-5">
            <div className="flex  mt-3">
              <Pagination
                limit={5}
                offset={0}
                total={100}
                siblingCount={2}
                onPageChange={handlePageChange}
                loading={false}
              />
            </div>
          </Flex>
        </Card>

        <Card title="Accordion">
          <Flex direction="col" className="gap-5 w-full">
            <Divider text="uiType default" />
            <Accordion
              items={[
                {
                  label: <Switcher />,
                  panel: (
                    <div className="">
                      <Input value="djuno-design" />
                    </div>
                  ),
                },
                {
                  label: "item2",
                  panel: (
                    <div className="">
                      <Alert uiType="info">This is an Alert</Alert>
                    </div>
                  ),
                },
              ]}
            />

            <Divider text="uiType transparent" />
            <Accordion
              items={[
                { label: <Switcher />, panel: <div>Panel Content 1</div> },
                { label: "Item 2", panel: <div>Panel Content 2</div> },
              ]}
              uiType="transparent"
            />

            <Divider text="loading" />
            <Accordion items={[]} loading />
          </Flex>
        </Card>

        <Card
          title="Layout"
          description="PanelLayout - PanelSidebar - PanelHeader"
          setting={
            <Flex items="center" className="gap-4">
              <Flex items="center" className="gap-1">
                <Text size="xs">global loading?</Text>
                <Switcher onChange={setGlobalLoading} value={globalLoading} />
              </Flex>
              <Flex items="center" className="gap-1">
                <Text size="xs">content loading?</Text>
                <Switcher onChange={setContentLoading} value={contentLoading} />
              </Flex>
            </Flex>
          }
        >
          {/* <div className=""> */}
          <PanelLayout
            type="mini"
            pathname="/"
            style={{ height: 400 }}
            globalLoading={globalLoading}
            contentLoading={contentLoading}
            className="w-full border border-slate-500 overflow-hidden"
            renderSidebar={({ segments, ...sidebarProps }) => (
              <PanelSidebar
                {...sidebarProps}
                sidebarHeader={
                  <div className="flex items-center gap-1 px-1">
                    <Logo className="w-5 h-5" />
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
            <div className="w-full h-[300px]"></div>
          </PanelLayout>
          {/* </div> */}
        </Card>

        <Card
          title="Sidebar"
          description={`pathname: ${pathname}`}
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
                  value={pathname === "/item1"}
                />
              </Flex>
              <Flex items="center" className="gap-1">
                <Text size="xs">Loading?</Text>
                <Switcher
                  onChange={handleTogleSidebarLoading}
                  value={sidebarLoading}
                />
              </Flex>
              <Flex items="center" className="gap-1">
                <Text size="xs">is visible?</Text>
                <Switcher
                  onChange={handleTogleSidebarActive}
                  value={sidebarActive}
                />
              </Flex>
            </Flex>
          }
        >
          <Flex className="gap-5" direction="col">
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
              renderSidebar={({ segments, isShowSidebar, type, ref }) => {
                console.log("refrence=>", ref);
                return (
                  <PanelSidebar
                    isShowSidebar={isShowSidebar}
                    type={type}
                    sidebarHeader={
                      <div className="flex items-center gap-1 px-1">
                        <Logo className="w-5 h-5" />
                        <Text size="xs">djuno-design</Text>
                      </div>
                    }
                    ref={ref}
                  >
                    <Sidebar
                      type={type}
                      items={sidebarItems}
                      subItems={sidebarSubItems}
                      segments={segments}
                      loading={sidebarLoading}
                      loadingMode="skeleton"
                      navItemHeight={30}
                    />
                  </PanelSidebar>
                );
              }}
              renderHeader={(headerProps) => (
                <PanelHeader {...headerProps} mobileIcon={<Logo />}>
                  <Text size="xs">header</Text>
                </PanelHeader>
              )}
            >
              <div className="w-full h-[300px]"></div>
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
          <Divider text="uiSize" />
          <Flex direction="col" className="gap-5 w-full mt-5">
            <Flex items="end" className="gap-3 w-full flex ">
              <Typography.Text size="sm" className="whitespace-nowrap">
                type hide:
              </Typography.Text>
              <SecureCopy
                text="small"
                type="hide"
                uiSize="small"
                copyable={{ tooltips: ["1", "2"], text: "" }}
              />
              <SecureCopy text="medium" type="hide" uiSize="medium" />
              <SecureCopy text="large" type="hide" uiSize="large" />
            </Flex>
            <Flex items="end" className="gap-3 w-full flex ">
              <Typography.Text size="sm" className="whitespace-nowrap">
                type copy:
              </Typography.Text>
              <SecureCopy text="small" type="copy" uiSize="small" />
              <SecureCopy text="medium" type="copy" uiSize="medium" />
              <SecureCopy text="large" type="copy" uiSize="large" />
            </Flex>
          </Flex>
        </Card>

        <Card title="Dropdown">
          <Divider text="Default dropdown" orientation="left" />
          <Flex direction="col" className="gap-5 w-full">
            <div className="h-full w-full inline-flex items-center  gap-1 px-4">
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
                >
                  <Text> Djuno Design</Text>
                </Dropdown>
              </div>
            </div>
          </Flex>
          <Divider text=" Simple dropdown" orientation="left" />
          <Flex direction="col" className="gap-5 w-full">
            <div className="h-full w-full inline-flex items-center  gap-1 px-4">
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
                />
              </div>
            </div>
          </Flex>
        </Card>

        <Card title="Switcher">
          <Flex direction="col" className="gap-5">
            <div>
              <Text>sizes:</Text>
              <Flex className="gap-5 w-full">
                <Flex direction="col">
                  <Text uiType="secondary" size="sm">
                    small
                  </Text>
                  <Switcher value={swith} onChange={setSwitch} uiSize="small" />
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
                  <Switcher value={swith} onChange={setSwitch} uiSize="large" />
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
            <Flex items="end" className="gap-3 w-full flex ">
              <Input label="small" uiSize="small" />
              <Input label="medium" uiSize="medium" />
              <Input label="large" uiSize="large" />
            </Flex>
            <Flex items="end" className="gap-3 w-full flex ">
              <Input label="loading" loading loadingType="elastic" />
            </Flex>
            <Flex items="end" className="gap-3 w-full flex ">
              <Input
                label="copyable"
                copyable={{
                  text: (v) => `Hi ${v}`,
                }}
                value="djuno-design"
              />
            </Flex>
            <Flex items="end" className="gap-3 w-full flex ">
              <Input
                label="error"
                loadingType="elastic"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputValue(e.target.value)
                }
                error={inputValue === "" ? "Field is required" : ""}
              />
            </Flex>
            <Flex items="end" className="gap-3 w-full flex ">
              <Input
                label="Input"
                copyable={{
                  icons: [
                    <FaceSmile />,
                    <FaceSmile className="text-green-500" />,
                  ],
                  tooltips: ["Click to copy", "Text copied!"],
                }}
              />
            </Flex>
            <Flex items="end" className="gap-3 w-full flex ">
              <Input label="Input" tooltip={{ content: "I'm a tooltip" }} />
            </Flex>
            <Flex items="end" className="gap-3 w-full flex ">
              <Input
                label="Input with custom label"
                labelClassName="text-green-500 font-bold"
              />
            </Flex>
            <Flex className="w-full">
              <Input label="Password" copyable type="password" />
            </Flex>
            <Flex className="w-full">
              <Input label="Input with style" labelStyle={{ color: "green" }} />
            </Flex>
          </Flex>
        </Card>

        <Card title="Select">
          <Flex direction="col" className="gap-5 w-full">
            <Flex items="end" className="gap-3 w-full flex ">
              <Select
                label="small"
                uiSize="small"
                options={selectOptions}
                className="w-[200px]"
                emptyString="select an option"
              />
              <Select
                label="medium"
                uiSize="medium"
                options={selectOptions}
                className="w-[200px]"
              />
              <Select
                label="large"
                uiSize="large"
                options={selectOptions}
                className="w-[200px]"
              />
            </Flex>
            <Flex items="end" className="gap-3 w-full flex ">
              <Select
                label="loading"
                loading
                options={selectOptions}
                className="w-[200px]"
              />
            </Flex>
            <Flex items="end" className="gap-3 w-full flex ">
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
            <Flex items="end" className="gap-3 w-full flex ">
              <Select label="empty" options={[]} className="w-[200px]" />
            </Flex>
            <Flex items="end" className="gap-3 w-full flex ">
              <Select
                label="tooltip"
                tooltip={{ content: "This is a tooltip", clickable: true }}
                options={[]}
                className="w-[200px]"
              />
            </Flex>

            <Flex items="end" className="gap-3 w-full flex ">
              <Select
                label="error"
                error={true}
                options={[]}
                className="w-[200px]"
              />
            </Flex>
            <Flex items="end" className="gap-3 w-full flex ">
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
            <Flex items="end" className="gap-3 w-full flex ">
              <Select
                label="Select with custom label"
                uiSize="medium"
                options={selectOptions}
                className="w-[200px]"
                emptyString="select an option"
                labelClassName="text-green-500 font-bold"
              />
            </Flex>
          </Flex>
        </Card>

        <Card title="Skeleton">
          <Flex direction="col" className="gap-5 w-full">
            <Skeleton />
            <Skeleton uiSize="small" />
            <Skeleton shape="square" />
            <Skeleton shape="circle" />
          </Flex>
        </Card>

        <Card title="Simple Table">
          <Text strong size="sm">
            Simple table with data
          </Text>
          <Flex className="gap-3 w-full mb-10">
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
          <Flex className="gap-3 w-full mb-10">
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
                    <div className="h-full w-full inline-flex items-center  gap-1 px-4">
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
                        />
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
                <SimpleTable.Row withoutHoverStyle>
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
          <Divider text=" Empty state with simple icon" orientation="left" />
          <Flex className="gap-3 w-full">
            <EmptyState
              text="Empty state"
              icon={<EmptyState.PRESENTED_IMAGE_SIMPLE />}
            />
          </Flex>
          <Divider text="Empty state with default icon" orientation="left" />
          <Flex className="gap-3 w-full">
            <EmptyState
              text="Empty state"
              icon={<EmptyState.PRESENTED_IMAGE_DEFAULT />}
            />
          </Flex>
          <Divider text="Empty state with undefined icon" orientation="left" />
          <Flex className="gap-3 w-full">
            <EmptyState text="Empty state" />
          </Flex>
          <Divider text="Empty state without icon" orientation="left" />
          <Flex className="gap-3 w-full">
            <EmptyState text="Empty state" usingIcon={false} />
          </Flex>
          <Divider
            text="Empty state without icon and with default text"
            orientation="left"
          />
          <Flex className="gap-3 w-full">
            <EmptyState usingIcon={false} />
          </Flex>
          <Divider text="Empty state without text" orientation="left" />
          <Flex className="gap-3 w-full">
            <EmptyState usingText={false} />
          </Flex>
        </Card>

        <Card title="Divider">
          <Flex className="gap-3 w-full">
            <Divider />
          </Flex>
          <Flex className="gap-3 w-full">
            <Divider uiType="simple" text="simple" />
          </Flex>
          <Flex className="gap-3 w-full">
            <Divider uiType="dashed" text="dashed" />
          </Flex>
          <Flex className="gap-3 w-full">
            <Divider uiType="dotted" text="dotted" />
          </Flex>
          <Flex className="gap-3 w-full">
            <Divider text="left" orientation="left" />
          </Flex>
          <Flex className="gap-3 w-full">
            <Divider text="center" orientation="center" />
          </Flex>
          <Flex className="gap-3 w-full">
            <Divider text="right" orientation="right" />
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
            <Alert uiType="info" message="Djuno Design. Info Alert" />
            <Alert uiType="warning" message="Djuno Design. Warning Alert" />
            <Alert uiType="success" message="Djuno Design. Success Alert" />
            <Alert uiType="error" message="Djuno Design. Error Alert" />
            <Text strong size="sm" className="mt-4">
              with description
            </Text>
            <Alert
              message={"Djuno Design. Alert with Description"}
              description="Error Description Error Description Error Description Error Description Error Description Error Description"
              uiType="info"
            />
            <Text strong size="sm" className="mt-4">
              with icon
            </Text>
            <Alert showIcon message="Djuno Design. Neutral Alert" />
            <Alert showIcon uiType="info" message="Djuno Design. Info Alert" />
            <Alert
              showIcon
              uiType="warning"
              message="Djuno Design. Warning Alert"
            />
            <Alert
              showIcon
              uiType="success"
              message="Djuno Design. Success Alert"
            />
            <Alert
              showIcon
              uiType="error"
              message="Djuno Design. Error Alert"
            />
            <Alert
              showIcon
              message="Djuno Design. Alert with Icon"
              description="Error Description Error Description Error Description Error Description Error Description Error Description"
              uiType="info"
            />
            <Text strong size="sm" className="mt-4">
              banner mode
            </Text>
            <Alert
              banner
              showIcon
              uiType="info"
              message="Djuno Design. Info Alert"
            />

            <Text strong size="sm" className="mt-4">
              wrap mode
            </Text>
            <Alert uiType="info">
              <Flex direction="col" className="gap-2 mt-1">
                <Button uiType="primary" className="gap-5 ">
                  Djuno Design
                </Button>

                <Text size="sm" className="font-semibold">
                  This is Alert wrap around button
                </Text>
              </Flex>
            </Alert>
            <Text strong size="sm" className="mt-4">
              closeable
            </Text>
            <Alert
              uiType="info"
              closable
              message="closeable alert"
              description="This is a description"
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
                icons: [
                  <FaceSmile />,
                  <FaceSmile className="text-green-500" />,
                ],
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
          <Flex direction="col" className="gap-2 w-full">
            <Flex items="center" className="gap-2 w-full">
              <Button>1</Button>
              <Button>2</Button>
              <Button>3</Button>
            </Flex>
            <Flex justify="center" items="center" className="gap-2 w-full">
              <Button>1</Button>
              <Button>2</Button>
              <Button>3</Button>
            </Flex>
            <Flex justify="end" items="center" className="gap-2 w-full">
              <Button>1</Button>
              <Button>2</Button>
              <Button>3</Button>
            </Flex>
            <Flex direction="col" items="start" className="gap-2 w-full">
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
              <Loading uiType="cutoff" />
            </Flex>
            <Flex items="center" className="gap-2">
              <Text size="sm">elastic</Text>
              <Loading uiType="elastic" borderSize={1.5} />
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
            <Tooltip.Info content="I'm a <Tooltip.Info/>" />
            <Tooltip.Error content="I'm a <Tooltip.Error/>" />
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
              <Button uiType="dangerLight">DangerLight</Button>
              <Button uiType="icon">Icon</Button>
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
              <Button uiType="dangerLight" disabled>
                DangerLight
              </Button>
              <Button uiType="icon" disabled>
                Icon
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </div>
  );
}
export default App;

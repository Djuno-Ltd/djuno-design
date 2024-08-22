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
  EmptyState,
  SimpleTable,
  SimpleTableRow,
  SimpleTableHead,
  SimpleTableBody,
  SimpleTableTH,
  SimpleTableTD,
} from "djuno-design";
import { useState } from "react";
import Header from "./Header";
import { ReactComponent as FaceSmile } from "./icons/face-smile.svg";

const { Text, Title, Paragraph, Link } = Typography;

function App() {
  const [btnLoading, setBtnLoading] = useState(false);
  const handleClick = () => {
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 3000);
  };

  interface TableData {
    data1: string;
    data2: string;
    data3: string;
  }
  const [data, setData] = useState<TableData[]>([]);
  return (
    <div className="App min-h-screen w-screen flex flex-col bg-blue-50 dark:bg-[#101214]">
      <Header />
      <Flex direction="col" className="gap-7 mx-auto min-w-[500px] my-10 ">
        <Card title="Simple Table">
          <Text strong size="sm">
            Simple table with data
          </Text>
          <Flex className="gap-3 w-full">
            <SimpleTable className="gap-3 w-full">
              <SimpleTableHead>
                <SimpleTableRow>
                  <SimpleTableTH>Header 1</SimpleTableTH>
                  <SimpleTableTH>Header 2</SimpleTableTH>
                  <SimpleTableTH>Header 3</SimpleTableTH>
                </SimpleTableRow>
              </SimpleTableHead>
              <SimpleTableBody>
                <SimpleTableRow>
                  <SimpleTableTD>Data 1</SimpleTableTD>
                  <SimpleTableTD>Data 2</SimpleTableTD>
                  <SimpleTableTD>Data 3</SimpleTableTD>
                </SimpleTableRow>
              </SimpleTableBody>
            </SimpleTable>
          </Flex>
          <Text strong size="sm">
            Simple table without data
          </Text>
          <Flex className="w-full">
            <SimpleTable className="gap-3 w-full">
              <SimpleTableHead>
                <SimpleTableRow>
                  <SimpleTableTH>Header 1</SimpleTableTH>
                  <SimpleTableTH>Header 2</SimpleTableTH>
                  <SimpleTableTH>Header 3</SimpleTableTH>
                </SimpleTableRow>
              </SimpleTableHead>
              <SimpleTableBody>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <SimpleTableRow key={index}>
                      <SimpleTableTD>{item.data1}</SimpleTableTD>
                      <SimpleTableTD>{item.data2}</SimpleTableTD>
                      <SimpleTableTD>{item.data3}</SimpleTableTD>
                    </SimpleTableRow>
                  ))
                ) : (
                  <SimpleTableRow>
                    <SimpleTableTD colSpan={3} className="text-center py-10">
                      <Flex className="w-full justify-center">
                        <EmptyState
                          text="No data available"
                          icon={<EmptyState.PRESENTED_IMAGE_SIMPLE />}
                        />
                      </Flex>
                    </SimpleTableTD>
                  </SimpleTableRow>
                )}
              </SimpleTableBody>
            </SimpleTable>
          </Flex>
        </Card>
        <Card title="Empty State">
          <Text strong size="sm">
            Empty state with simple icon
          </Text>
          <Flex className="gap-3 w-full">
            <EmptyState
              text="Empty state"
              icon={<EmptyState.PRESENTED_IMAGE_SIMPLE />}
            />
          </Flex>
          <Text strong size="sm">
            Empty state with default icon
          </Text>
          <Flex className="gap-3 w-full">
            <EmptyState
              text="Empty state"
              icon={<EmptyState.PRESENTED_IMAGE_DEFAULT />}
            />
          </Flex>
          <Text strong size="sm">
            Empty state with undefined icon
          </Text>
          <Flex className="gap-3 w-full">
            <EmptyState text="Empty state" />
          </Flex>
          <Text strong size="sm">
            Empty state without icon
          </Text>
          <Flex className="gap-3 w-full">
            <EmptyState text="Empty state" usingIcon={false} />
          </Flex>
          <Text strong size="sm">
            Empty state without icon and with default text
          </Text>
          <Flex className="gap-3 w-full">
            <EmptyState usingIcon={false} />
          </Flex>
          <Text strong size="sm">
            Empty state without text
          </Text>
          <Flex className="gap-3 w-full">
            <EmptyState usingText={false} />
          </Flex>
        </Card>
        <Card title="Inputs">
          <Flex className="gap-3 w-full">
            <Input
              label="input label"
              loading={false}
              loadingType="elastic"
              copyableFn={() => "test text"}
            />
            <Button>Add</Button>
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
            cd
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

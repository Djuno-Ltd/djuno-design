import { Checkbox, Flex, Typography, useDjunoDesign } from "djuno-design";
import { ReactComponent as Logo } from "./logo.svg";
import { ReactComponent as NPM } from "./npm.svg";

const { Text, Link } = Typography;
const Header = () => {
  const {
    theme: { mode, changeMode },
  } = useDjunoDesign();

  const handleChangeTheme = (checked: boolean) => {
    changeMode(checked ? "dark" : "light");
  };
  return (
    <Flex
      justify="between"
      items="center"
      className="px-8 py-4 border-b sticky top-0 bg-white dark:bg-[#161A1D] dark:border-b-[#22272B] z-50"
    >
      <Flex items="center" className="gap-1">
        <div>
          <Logo style={{ width: "22px", height: "22px" }} />
        </div>
        <Text className="whitespace-nowrap" size="base">
          djuno-design lab🧪
        </Text>
        <Text uiType="secondary" size="xs">
          v0.8.4
        </Text>
      </Flex>

      <Flex items="center" className="gap-3">
        <Checkbox
          value={mode === "dark"}
          onChange={handleChangeTheme}
          label="dark mode"
        />
        <Link
          size="sm"
          href="https://www.npmjs.com/package/djuno-design"
          target="_blank"
        >
          <Flex items="center">
            <NPM className="h-3" />
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Header;

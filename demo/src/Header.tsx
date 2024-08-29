import { Flex, Typography } from "djuno-design";
import { ReactComponent as Logo } from "./logo.svg";
import { ReactComponent as NPM } from "./npm.svg";
import useDarkMode from "./useDarkMode";

const { Text, Link } = Typography;
const Header = () => {
  const { mode, changeMode } = useDarkMode();
  const handleChangeTheme = (e: any) => {
    const isDark = e.target.checked;
    changeMode(isDark ? "dark" : "light");
  };
  return (
    <Flex
      justify="between"
      items="center"
      className="px-8 py-4 border-b sticky top-0 bg-white dark:bg-[#161A1D] dark:border-b-[#22272B] z-50"
    >
      <Flex items="center" className="gap-1">
        <Logo className="w-6" />
        <Text>djuno-design</Text>
        <Text uiType="secondary" size="xs">
          v0.4.0
        </Text>
      </Flex>
      <Flex items="center" className="gap-3">
        <Flex items="center" className="gap-1">
          <input
            checked={mode === "dark"}
            id="themeMode"
            type="checkbox"
            onChange={handleChangeTheme}
          />
          <label htmlFor="themeMode">
            <Text size="sm" className="select-none">
              dark mode
            </Text>
          </label>
        </Flex>
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

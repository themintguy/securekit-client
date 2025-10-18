import { useTheme } from "../hooks/useTheme";
import { FiSun, FiMoon } from "react-icons/fi";


const ThemeToogle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-full text-xl ${
          theme === "dark" ? "text-yellow-400" : "text-gray-800"
        }`}
      >
        {theme === "dark" ? <FiSun /> : <FiMoon />}
      </button>
    </>
  );
};

export default ThemeToogle;

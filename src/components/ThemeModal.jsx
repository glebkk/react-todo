import React from 'react'

function ThemeModal({themeModalActive, setSelectedTheme, setThemeModalActive}) {
  return (
    <div>
        {themeModalActive && (
            <ul
              className={`border-2 bg-white absolute font-medium w-32 top-10 right-0 rounded-lg py-2 dark:bg-[#15171d] dark:border-none`}
              onClick={(e) => e.stopPropagation()}
            >
              {themeOpt.map((theme, i) => (
                <li
                  className={`${
                    selectedTheme === i ? "text-teal-600" : "text-slate-400"
                  } flex px-2 py-1 items-center cursor-pointer gap-2 hover:bg-teal-600/20`}
                  key={theme.theme}
                  onClick={() => {
                    setSelectedTheme(i);
                    setThemeModalActive(false);
                  }}
                >
                  {theme.icon}
                  {theme.theme}
                </li>
              ))}
            </ul>
          )}
    </div>
  )
}

export default ThemeModal
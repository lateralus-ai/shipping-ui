import { tabPanel } from "@material-tailwind/react";

export const materialTheme = {
  button: {
    defaultProps: {
      className:
        "items-center normal-case shadow-none hover:shadow-none text-caption-1 font-medium h-10 rounded-lg flex gap-2 px-3 truncate tracking-[0.16px] justify-center",
      ripple: false,
      color: "green",
    },
    styles: {
      sizes: {
        md: {
          fontSize: "text-md",
          className: "py-2",
        },
      },
      variants: {
        filled: {
          blue: {
            color: "!text-white",
            background: "bg-blue-400",
            hover: "hover:bg-blue-500",
            disabled:
              "disabled:bg-blue-200 disabled:!text-blue-600 !opacity-100",
          },
          green: {
            color: "!text-white",
            background: "bg-green-600",
            hover: "hover:bg-green-700",
            disabled:
              "disabled:bg-green-200 disabled:!text-green-600 !opacity-100",
          },
          red: {
            color: "!text-white",
            background: "bg-red-600",
            hover: "hover:bg-red-700",
            disabled: "disabled:bg-red-200 disabled:!text-red-600 !opacity-100",
          },
          gray: {
            color: "text-black",
            background: "bg-gray-50",
            hover: "hover:bg-gray-100",
            disabled:
              "disabled:bg-gray-50 disabled:!text-gray-200 !opacity-100",
          },
          orange: {
            color: "!text-orange-600",
            background: "bg-orange-50",
            hover: "hover:bg-orange-100",
            disabled:
              "disabled:bg-orange-50 disabled:!text-orange-200 !opacity-100",
          },
        },
        outlined: {
          gray: {
            background: "bg-white",
            color: "text-gray-700 border-gray-100",
            hover: "!text-gray-900 hover:bg-gray-100",
            disabled: "disabled:text-gray-500",
          },
        },
        text: {
          green: {
            color: "!text-green-600",
            hover: "hover:bg-gray-100",
            disabled: "disabled:!text-gray-500",
          },
          gray: {
            color: "!text-gray-700",
            hover: "hover:bg-gray-100",
            disabled: "disabled:!text-gray-500",
          },
        },
      },
    },
  },
  iconButton: {
    defaultProps: {
      className:
        "items-center justify-center normal-case shadow-none hover:shadow-none text-caption-1 font-medium h-10 rounded-lg flex gap-2 px-3 truncate",
      ripple: false,
      color: "green",
    },
    styles: {
      sizes: {
        md: {
          fontSize: "text-md",
          className: "py-2",
        },
      },
      variants: {
        filled: {
          blue: {
            color: "!text-white",
            background: "bg-blue-400",
            hover: "hover:bg-blue-500",
            disabled:
              "disabled:bg-blue-200 disabled:!text-blue-600 !opacity-100",
          },
          green: {
            color: "!text-white",
            background: "bg-green-600",
            hover: "hover:bg-green-700",
            disabled:
              "disabled:bg-green-200 disabled:!text-green-600 !opacity-100",
          },
          red: {
            color: "!text-white",
            background: "bg-red-600",
            hover: "hover:bg-red-700",
            disabled: "disabled:bg-red-200 disabled:!text-red-600 !opacity-100",
          },
          gray: {
            color: "text-black",
            background: "bg-gray-50",
            hover: "hover:bg-gray-100",
            disabled:
              "disabled:bg-gray-50 disabled:!text-gray-200 !opacity-100",
          },
          orange: {
            color: "!text-orange-600",
            background: "bg-orange-50",
            hover: "hover:bg-orange-100",
            disabled:
              "disabled:bg-orange-50 disabled:!text-orange-200 !opacity-100",
          },
        },
        outlined: {
          gray: {
            background: "bg-white",
            color: "text-gray-700 border-gray-100",
            hover: "!text-gray-900 hover:bg-gray-100",
            disabled: "disabled:text-gray-500",
          },
        },
        text: {
          green: {
            color: "!text-green-600",
            hover: "hover:bg-gray-100",
            disabled: "disabled:!text-gray-500",
          },
          gray: {
            color: "!text-gray-700",
            hover: "hover:bg-gray-100",
            disabled: "disabled:!text-gray-500",
          },
        },
      },
    },
  },
  progress: {
    defaultProps: {
      className: "bg-gray-100",
      barProps: {
        className: "transform transition-all duration-300",
      },
    },
    styles: {
      sizes: {
        sm: {
          container: {
            initial: { height: "h-1" },
          },
        },
      },
    },
  },
  menu: {
    styles: {
      base: {
        menu: {
          border: "border border-gray-100",
          borderRadius: "rounded-xl",
          boxShadow: "shadow-sm",
          p: "p-2",
        },
        item: {
          initial: {
            display:
              "flex gap-2 items-center focus-within:outline-none text-gray-900",
            bg: "hover:bg-gray-100",
            p: "p-2",
          },
        },
      },
    },
  },
  dialog: {
    defaultProps: {
      size: "sm",
      dismiss: {},
      animate: {
        mount: {},
        unmount: {},
      },
      className: "",
    },
    valid: {
      sizes: ["xs", "sm", "md", "lg", "xl", "xxl"],
    },
    styles: {
      base: {
        backdrop: {
          width: "w-full",
          display: "grid",
          placeItems: "place-items-center",
          position: "fixed",
          top: 0,
          left: 0,
          height: "h-screen",
          backgroundColor: "bg-[rgba(0,0,0,0.16)]",
          backgroundOpacity: "bg-opacity-100",
          backdropFilter: "backdrop-blur-none",
        },
        container: {
          height: "h-[450px]",
          position: "relative",
          bg: "bg-white",
          m: "m-4",
          borderRadius: "rounded-xl",
          boxShadow:
            "shadow-[0px_2px_8px_0px_#00000029,0px_2px_2px_0px_#0000000A,0px_8px_8px_-8px_#0000000A]",
          fontSmoothing: "antialiased",
        },
      },
      sizes: {
        sm: {
          maxWidth: "!max-w-[550px]",
        },
        lg: {
          maxWidth: "!max-w-[700px]",
        },
      },
    },
  },
  dialogHeader: {
    styles: {
      base: {
        display: "text-gray-900 font-normal",
      },
    },
  },
  checkbox: {
    defaultProps: {
      color: "custom",
      ripple: false,
    },
    valid: {
      colors: ["blue-gray", "gray", "red", "green", "custom"],
    },
    styles: {
      base: {
        root: {
          display: "inline-flex",
          alignItems: "items-center",
        },
        container: {
          position: "relative",
          display: "flex",
          alignItems: "items-center",
          cursor: "cursor-pointer",
          p: "!p-0",
          borderRadius: "rounded-full",
        },
        input: {
          peer: "peer",
          position: "relative",
          appearance: "appearance-none",
          width: "w-5",
          height: "h-5",
          borderWidth: "border-[1.5px]",
          borderRadius: "rounded-md",
          borderColor: "border-gray-100",
          cursor: "cursor-pointer",
          transition: "transition-all",
          before: {
            content: "before:content-['']",
            display: "before:block",
            bg: "before:bg-transparent",
            width: "before:w-12",
            height: "before:h-12",
            borderRadius: "before:rounded-full",
            position: "before:absolute",
            opacity: "before:opacity-0 hover:before:opacity-10",
          },
        },
        label: {
          color: "text-gray-700",
          fontWeight: "font-light",
          userSelect: "select-none",
          cursor: "cursor-pointer",
          mt: "mt-px",
          px: "px-2",
        },
        icon: {
          display: "flex",
          alignItems: "items-center",
          justifyContent: "justify-center",
          width: "w-5",
          height: "h-5",
          color: "text-green-600",
          position: "absolute",
          pointerEvents: "pointer-events-none",
          opacity: "opacity-0 peer-checked:opacity-100",
          transition: "transition-opacity",
        },
        disabled: {
          opacity: "opacity-50",
          pointerEvents: "pointer-events-none",
        },
      },
      colors: {
        custom: {
          border: "checked:border-green-600",
        },
      },
    },
  },
  popover: {
    defaultProps: {
      placement: "top",
      offset: 5,
      dismiss: {},
      animate: {
        unmount: {},
        mount: {},
      },
      className: "",
    },
    styles: {
      base: {
        bg: "bg-white",
        p: "p-4",
        borderWidth: "border",
        borderColor: "border-gray-200",
        borderRadius: "rounded-lg",
        boxShadow:
          "[box-shadow:0px_2px_2px_0px_#0000000A,_0px_8px_8px_-8px_#0000000A]",
        fontSize: "text-sm",
        fontWeight: "font-normal",
        color: "text-blue-gray-500",
        outline: "focus:outline-none",
        overflowWrap: "break-words",
        whiteSpace: "whitespace-normal",
      },
    },
  },
  switch: {
    defaultProps: {
      color: "blue",
      label: "",
      ripple: true,
      className: "",
      disabled: false,
      containerProps: undefined,
      labelProps: undefined,
      circleProps: undefined,
    },
    valid: {
      colors: [
        "blue-gray",
        "gray",
        "brown",
        "deep-orange",
        "orange",
        "amber",
        "yellow",
        "lime",
        "light-green",
        "green",
        "teal",
        "cyan",
        "light-blue",
        "blue",
        "indigo",
        "deep-purple",
        "purple",
        "pink",
        "red",
      ],
    },
    styles: {
      base: {
        input: {
          background: "bg-gray-500",
        },
        circle: {
          borderColor: "border-gray-500",
          borderRadius: "rounded-full",
          boxShadow: "shadow-md",
          position: "absolute",
          top: "top-2/4",
          left: "-left-1",
          transform: "-translate-y-2/4 peer-checked:translate-x-full",
          transition: "transition-all duration-300",
          cursor: "cursor-pointer",
          before: {
            content: "before:content['']",
            display: "before:block",
            bg: "before:bg-blue-gray-500",
            width: "before:w-10",
            height: "before:h-10",
            borderRadius: "before:rounded-full",
            position: "before:absolute",
            top: "before:top-2/4",
            left: "before:left-2/4",
            transform: "before:-translate-y-2/4 before:-translate-x-2/4",
            transition: "before:transition-opacity",
            opacity: "before:opacity-0 hover:before:opacity-10",
          },
        },
        ripple: {
          display: "inline-block",
          top: "top-2/4",
          left: "left-2/4",
          transform: "-translate-x-2/4 -translate-y-2/4",
          p: "p-5",
          borderRadius: "rounded-full",
        },
        label: {
          color: "text-gray-700",
          fontWeight: "font-light",
          userSelect: "select-none",
          cursor: "cursor-pointer",
          mt: "mt-px",
          ml: "ml-3",
          mb: "mb-0",
        },
        disabled: {
          opacity: "opacity-50",
          pointerEvents: "pointer-events-none",
        },
      },
      colors: {
        gray: {
          input: "checked:bg-blue-gray-100",
          circle: "peer-checked:border-blue-gray-100",
          before: "peer-checked:before:bg-gray-500",
        },
        green: {
          input: "checked:bg-green-600",
          circle: "peer-checked:border-green-600",
          before: "peer-checked:before:bg-green-600",
        },
      },
    },
  },
  tabsHeader: {
    defaultProps: {
      className:
        "grow gap-8 rounded-none bg-transparent !p-0 border-b border-b-gray-100 flex items-end px-0 w-full",
    },
  },
  tab: {
    defaultProps: {
      className: "min-w-fit max-w-fit justify-start font-medium text-gray-600",
    },
    styles: {
      base: {
        indicator: {
          bg: "bg-transparent border-b-2 border-gray-900 !transform-none",
          borderRadius: "radius-none",
          boxShadow: "shadow-none",
        },
      },
    },
  },
  tabPanel: {
    styles: {
      base: {
        p: "px-0",
      },
    },
  },
};

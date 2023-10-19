import useCanvasStore from "@/stores/useCanvasStore";
import useUIStore from "@/stores/useUIStore";
import handleAddITextToCanvas from "@/utils/fabricUtils/handleAddITextToCanvas";
import handleCanvasBackgroundColor from "@/utils/fabricUtils/handleCanvasBackgroundColor";
import handleGetCanvasCenter from "@/utils/fabricUtils/handleGetCanvasCenter";

const useMenuOptions = () => {
  const uiStore = useUIStore();
  const canvasStore = useCanvasStore();

  const MENU_OPTIONS = [
    {
      id: 1,
      title: "Selection",
      icon: "mouse-pointer",
      canvasMode: "mainMenu",
      keyShortCut: "1",
      onClick() {
        uiStore.setCanvasMode({
          canvasMode: "mainMenu",
        });
      },
    },
    {
      id: 2,
      title: "Draw",
      icon: "edit-2",
      canvasMode: "drawing",
      keyShortCut: "2",
      onClick() {
        uiStore.setCanvasMode({
          canvasMode:
            uiStore.getCanvasMode === "drawing" ? "mainMenu" : "drawing",
        });
      },
    },
    {
      id: 3,
      title: "Line",
      icon: "minus",
      canvasMode: "line",
      keyShortCut: "3",
      onClick() {
        uiStore.setCanvasMode({
          canvasMode: uiStore.getCanvasMode === "line" ? "mainMenu" : "line",
        });
      },
    },
    {
      id: 4,
      title: "Arrow",
      icon: "arrow-right",
      canvasMode: "arrow",
      keyShortCut: "4",
      onClick() {
        uiStore.setCanvasMode({
          canvasMode: uiStore.getCanvasMode === "arrow" ? "mainMenu" : "arrow",
        });
      },
    },
    {
      id: 5,
      title: "Square",
      icon: "square",
      canvasMode: "square",
      keyShortCut: "5",
      onClick() {
        uiStore.setCanvasMode({
          canvasMode:
            uiStore.getCanvasMode === "square" ? "mainMenu" : "square",
        });
      },
    },
    {
      id: 6,
      title: "Text",
      icon: "type",
      canvasMode: "text",
      keyShortCut: "6",
      onClick() {
        handleAddITextToCanvas({
          position: handleGetCanvasCenter(canvasStore.getSelectedCanvas),
          text: "Double click to edit text",
          canvas: canvasStore.getSelectedCanvas,
        });
      },
    },
    {
      id: 7,
      title: "Move",
      icon: "crosshair",
      canvasMode: "panning",
      keyShortCut: "7",
      onClick() {
        uiStore.setCanvasMode({
          canvasMode:
            uiStore.getCanvasMode === "panning" ? "mainMenu" : "panning",
        });
      },
    },
    {
      id: 8,
      title: "Background",
      icon: "grid",
      canvasMode: "background",
      keyShortCut: "8",
      onClick() {
        const bgColor = canvasStore.getSelectedCanvas?.backgroundColor;
        const isTransparent = bgColor === "transparent" || !bgColor;

        handleCanvasBackgroundColor({
          canvas: canvasStore.getSelectedCanvas,
          backgroundColorType: isTransparent ? "pattern" : "transparent",
        });
      },
    },
    {
      id: 9,
      title: "Reset",
      icon: "trash-2",
      canvasMode: "trash",
      keyShortCut: "9",
      onClick() {
        canvasStore.getSelectedCanvas?.clear();
        canvasStore.getSelectedCanvas?.renderAll();
      },
    },
  ];

  return { menuOptions: MENU_OPTIONS };
};

export default useMenuOptions;

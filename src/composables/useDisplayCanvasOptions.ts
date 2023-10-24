import useLocalStorageCanvas from "@/stores/useLocalStorageCanvas";
import {
  AkDownload,
  AnOutlinedDelete,
  AnOutlinedEdit,
  CaSelectWindow,
} from "@kalimahapps/vue-icons";

export type EmitEvent =
  | "edit-name"
  | "delete-canvas"
  | "new-canvas-loaded"
  | "export-canvas-select";

const useDisplayCanvasOptions = () => {
  const { storedSelectedCanvasName } = useLocalStorageCanvas();

  const MENU_OPTIONS = [
    {
      id: 1,
      title: "Select",
      icon: CaSelectWindow,
      onClick(name: string): { name: string; emitEvent: EmitEvent } {
        storedSelectedCanvasName.updateValue(name);
        return {
          name,
          emitEvent: "new-canvas-loaded",
        };
      },
    },
    {
      id: 2,
      title: "Edit",
      icon: AnOutlinedEdit,
      onClick(name: string): { name: string; emitEvent: EmitEvent } {
        return {
          name,
          emitEvent: "edit-name",
        };
      },
    },
    {
      id: 3,
      title: "Export",
      icon: AkDownload,
      onClick(name: string): { name: string; emitEvent: EmitEvent } {
        return {
          name,
          emitEvent: "export-canvas-select",
        };
      },
    },
    {
      id: 4,
      title: "Delete",
      icon: AnOutlinedDelete,
      onClick(name: string): { name: string; emitEvent: EmitEvent } {
        return {
          name,
          emitEvent: "delete-canvas",
        };
      },
    },
  ];

  return {
    menuOptions: MENU_OPTIONS,
  };
};

export default useDisplayCanvasOptions;

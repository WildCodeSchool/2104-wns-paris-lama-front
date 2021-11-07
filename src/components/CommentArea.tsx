/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import ReactDOM from "react-dom";
import React, { FunctionComponent, useMemo } from "react";
import {
  createPlateComponents,
  createPlateOptions,
  HeadingToolbar,
  PlatePlugin,
  Plate,
  createAlignPlugin,
  createAutoformatPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createExitBreakPlugin,
  createHeadingPlugin,
  createHighlightPlugin,
  createHistoryPlugin,
  createKbdPlugin,
  createImagePlugin,
  createItalicPlugin,
  createLinkPlugin,
  createListPlugin,
  createMediaEmbedPlugin,
  createNodeIdPlugin,
  createParagraphPlugin,
  createReactPlugin,
  createResetNodePlugin,
  createSelectOnBackspacePlugin,
  createSoftBreakPlugin,
  createDndPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createTablePlugin,
  createTodoListPlugin,
  createTrailingBlockPlugin,
  createUnderlinePlugin,
  createDeserializeHTMLPlugin,
  createComboboxPlugin,
  createIndentPlugin,
  SPEditor,
  createFontColorPlugin,
  createFontBackgroundColorPlugin,
  createDeserializeMDPlugin,
  createDeserializeCSVPlugin,
  createDeserializeAstPlugin,
  createNormalizeTypesPlugin,
  createFontSizePlugin,
  createHorizontalRulePlugin,
} from "@udecode/plate";
import {
  createExcalidrawPlugin,
  ELEMENT_EXCALIDRAW,
  ExcalidrawElement,
} from "@udecode/plate-excalidraw";
import "tippy.js/dist/tippy.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";
import { v4 } from "uuid";
import { withStyledPlaceHolders } from "../config/components/withStyledPlaceHolders";
import { ToolbarButtons } from "../config/components/CommentToolbars";
import { CONFIG } from "../config/config";

type TEditor = SPEditor & ReactEditor & HistoryEditor;

let components = createPlateComponents({
  [ELEMENT_EXCALIDRAW]: ExcalidrawElement as FunctionComponent<{}>,
  // customize your components by plugin key
});
components = withStyledPlaceHolders(components);

const options = createPlateOptions({
  // customize your options by plugin key
});

const CommentArea = ({ value, onChange, id }: { value; onChange; id }) => {
  const pluginsMemo: PlatePlugin<TEditor>[] = useMemo(() => {
    const plugins = [
      createReactPlugin(),
      createHistoryPlugin(),
      createParagraphPlugin(),
      createBlockquotePlugin(),
      createTodoListPlugin(),
      createHeadingPlugin(),
      createImagePlugin(),
      createHorizontalRulePlugin(),
      createLinkPlugin(),
      createListPlugin(),
      createTablePlugin(),
      createMediaEmbedPlugin(),
      createExcalidrawPlugin(),
      createCodeBlockPlugin(),
      createAlignPlugin(CONFIG.align),
      createBoldPlugin(),
      createCodePlugin(),
      createItalicPlugin(),
      createHighlightPlugin(),
      createUnderlinePlugin(),
      createStrikethroughPlugin(),
      createSubscriptPlugin(),
      createSuperscriptPlugin(),
      createFontColorPlugin(),
      createFontBackgroundColorPlugin(),
      createFontSizePlugin(),
      createKbdPlugin(),
      createNodeIdPlugin(),
      createDndPlugin(),
      createIndentPlugin(CONFIG.indent),
      createAutoformatPlugin(CONFIG.autoformat),
      createResetNodePlugin(CONFIG.resetBlockType),
      createSoftBreakPlugin(CONFIG.softBreak),
      createExitBreakPlugin(CONFIG.exitBreak),
      createNormalizeTypesPlugin(CONFIG.forceLayout),
      createTrailingBlockPlugin(CONFIG.trailingBlock),
      createSelectOnBackspacePlugin(CONFIG.selectOnBackspace),
      createComboboxPlugin(),
    ];

    plugins.push(
      ...[
        createDeserializeMDPlugin({ plugins }),
        createDeserializeCSVPlugin({ plugins }),
        createDeserializeHTMLPlugin({ plugins }),
        createDeserializeAstPlugin({ plugins }),
      ]
    );

    return plugins;
  }, []);

  return (
    <Plate
      id={id}
      plugins={pluginsMemo}
      components={components}
      options={options}
      editableProps={CONFIG.editableProps}
      initialValue={value}
      onChange={onChange}
    >
      <div className="text-purple-700">
        <HeadingToolbar>
          <ToolbarButtons />
        </HeadingToolbar>
      </div>
    </Plate>
  );
};
export default CommentArea;

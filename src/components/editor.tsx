import { useCallback, useEffect } from "react";
import type { EditorState } from "@codemirror/state";
import useCodeMirror from "../hooks/use-code-mirror";

type Props = {
  initialDoc: string;
  onChange: (doc: string) => void;
};

const OwnEditor = ({ initialDoc, onChange }: Props) => {
  const handleChange = useCallback(
    (state: EditorState) => onChange(state.doc.toString()),
    [onChange]
  );
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc,
    onChange: handleChange,
  });
  useEffect(() => {
    if (editorView) {
    } else {
    }
  }, [editorView]);

  return <div ref={refContainer}></div>;
};

export default OwnEditor;

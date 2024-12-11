/** @format */

import React, { memo, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const MarkDown = ({
  label,
  value,
  changeValue,
  name,
  invalidField,
  setInvalidField,
}) => {
  return (
    <div className="flex flex-col flex-1  ">
      <label className="block text-sm font-medium text-gray-900 min-w-[80px] mb-2">
        {label}
      </label>
      <Editor
        apiKey="dhlxleeqnprm5fginnh3rftr5cvbvcvc3pkxzfke213luzxe"
        initialValue={value}
        init={{
          height: 500,

          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onChange={(e) =>
          changeValue((prev) => ({ ...prev, [name]: e.target.getContent() }))
        }
        onFocus={() => setInvalidField && setInvalidField([])}
      />
      {invalidField?.some((el) => el.name === name) && (
        <small className="text-[12px] text-main italic mt-2">
          {invalidField?.find((el) => el.name === name).mes}
        </small>
      )}
    </div>
  );
};
export default memo(MarkDown);

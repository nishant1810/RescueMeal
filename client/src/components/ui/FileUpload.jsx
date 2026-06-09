import React from "react";

import {
  Upload,
} from "lucide-react";

/*
========================================
FILE UPLOAD
========================================
*/

const FileUpload =
  ({

    label,

    preview,

    onChange,
  }) => {

    return (

      <div className="space-y-3">

        {/* LABEL */}

        <label

          className="

            block

            text-sm

            font-semibold

            text-gray-700
          "
        >

          {label}

        </label>

        {/* UPLOAD */}

        <label

          className="

            border-2

            border-dashed

            border-gray-300

            rounded-2xl

            p-8

            flex

            flex-col

            items-center

            justify-center

            gap-4

            cursor-pointer

            hover:border-orange-400

            transition-all

            duration-200
          "
        >

          <Upload size={40} />

          <p className="text-gray-500">

            Click to upload image

          </p>

          <input

            type="file"

            accept="image/*"

            onChange={onChange}

            className="hidden"
          />

        </label>

        {/* PREVIEW */}

        {preview && (

          <img

            src={preview}

            alt="preview"

            className="

              w-full

              h-64

              object-cover

              rounded-2xl
            "
          />
        )}

      </div>
    );
  };

export default FileUpload;
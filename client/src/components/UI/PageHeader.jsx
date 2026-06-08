import React from "react";

/*
========================================
PAGE HEADER
========================================
*/

const PageHeader = ({
  title,
  description = "",
  action = null,
  className = "",
}) => {
  return (
    <div
      className={`
        flex
        flex-col
        lg:flex-row
        lg:items-start
        lg:justify-between
        gap-6
        mb-10
        ${className}
      `}
    >
      {/* ========================================
          LEFT SECTION
      ======================================== */}

      <div className="flex-1 min-w-0">
        {/* TITLE */}

        <h1
          className="
            text-3xl
            sm:text-4xl
            font-extrabold
            text-gray-900
            leading-tight
            tracking-tight
          "
        >
          {title}
        </h1>

        {/* DESCRIPTION */}

        {description && (
          <p
            className="
              mt-2
              text-base
              sm:text-lg
              text-gray-500
              max-w-2xl
            "
          >
            {description}
          </p>
        )}
      </div>

      {/* ========================================
          ACTION SECTION
      ======================================== */}

      {action && (
        <div
          className="
            w-full
            sm:w-auto
            flex
            justify-start
            lg:justify-end
            shrink-0
          "
        >
          {action}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
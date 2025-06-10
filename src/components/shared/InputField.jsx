import PropTypes from 'prop-types';
import { memo } from 'react';

const InputField = memo(({
    label,
    id,
    type = 'text',
    errors,
    register,
    required = false,
    message,
    className,
    min,
    placeholder,
}) => {
    const errorMessage = errors?.[id]?.message;
    const hasError = Boolean(errorMessage);

    return (
        <div className="flex flex-col gap-1 w-full">
            <label
                htmlFor={id}
                className={`${
                    className || ""
                } font-semibold text-sm text-slate-800`}
            >
                {label}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                aria-invalid={hasError}
                aria-describedby={hasError ? `${id}-error` : undefined}
                className={`${
                    className || ""
                } px-2 py-2 border outline-none bg-transparent text-slate-800 rounded-md ${
                    hasError ? "border-red-500" : "border-slate-700" 
                }`}
                {...register(id, {
                    required: { value: required, message },
                    minLength: min
                        ? { value: min, message: `Minimum ${min} character is required` }
                        : null,
                    pattern:
                        type === "email"
                            ? {
                                value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/,
                                message: "Invalid email"
                            }
                            : type === "url"
                            ? {
                                value: /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                                message: "Please enter a valid url"
                            }
                            : null,
                })}
            />

            {hasError && (
                <p 
                    id={`${id}-error`}
                    className="text-sm font-semibold text-red-600 mt-0"
                    role="alert"
                >
                    {errorMessage}
                </p>
            )}
        </div>
    );
});

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    errors: PropTypes.object,
    register: PropTypes.func.isRequired,
    required: PropTypes.bool,
    message: PropTypes.string,
    className: PropTypes.string,
    min: PropTypes.number,
    placeholder: PropTypes.string,
};

InputField.defaultProps = {
    type: 'text',
    required: false,
    errors: {},
};

InputField.displayName = 'InputField';

export default InputField;
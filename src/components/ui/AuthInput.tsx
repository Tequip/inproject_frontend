import { FC, ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface IAuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
    forwardedRef?: ForwardedRef<HTMLInputElement>;
    className?: string;
    inputClass?: string;
    error?: string;
    label?: string;
}

export const AuthInput: FC<IAuthInputProps> = ({
    forwardedRef,
    id,
    className = "",
    inputClass = "",
    error = "",
    label = "",
    type = "text",
    ...inputProps
}) => {
    return (
        <div className={["text-left", className].join(" ")}>
            {label && (
                <label htmlFor={id} className="flex justify-between label mb-2">
                    <span>{label}</span>
                    {error && <span className="text-danger">{error}</span>}
                </label>
            )}
            <input
                ref={forwardedRef}
                id={id}
                className={[
                    "h-10 outline-none border-2 border-primary text-sm focus:ring-primary focus:border-primary block w-full px-2.5 bg-background placeholder-neutral",
                    error && "!border-danger",
                    inputClass,
                ].join(" ")}
                type={type}
                {...inputProps}
            />
        </div>
    );
};

export default forwardRef(
    (props: IAuthInputProps, ref: ForwardedRef<HTMLInputElement>) => (
        <AuthInput forwardedRef={ref} {...props} />
    )
);

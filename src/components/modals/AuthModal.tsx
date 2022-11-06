import Modal from "components/ui/Modal";
import { FC, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { hideAuthModal } from "store/reducers/modalsReducer";
import { useForm } from "react-hook-form";
import Button from "components/ui/Button";
import useFade from "hooks/useFade";
import TextButton from "components/ui/TextButton";
import AuthInput from "components/ui/AuthInput";
import { loginUser, registerUser } from "store/reducers/userReducer";
import { useNavigate } from "react-router-dom";

export interface IAuthForm {
    email: string;
    password: string;
    confirm_password: string;
}

const AuthModal: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { error, loading } = useAppSelector((state) => state.user);
    const { isShowAuthModal } = useAppSelector((state) => state.modals);
    const {
        register,
        handleSubmit,
        setFocus,
        watch,
        reset,
        formState: { errors: formErrors },
    } = useForm<IAuthForm>();
    const [isRegister, setIsRegister] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [startFadeAnimation, isFade] = useFade(contentRef);
    const registerOptions = {
        email: {
            required: "Required",
            pattern: {
                value: /.+@.+/,
                message: "Email is not valid",
            },
        },
        password: {
            required: "Required",
            minLength: {
                value: 8,
                message: "At least 8 characters",
            },
        },
        confirmPassword: {
            required: "Required",
            validate: (value: string) => {
                if (watch("password") !== value) {
                    return "Mismatch";
                }
            },
        },
    };

    useEffect(() => {
        setFocus && setFocus("email");
    }, [setFocus, isFade]);

    const toggleRegister = () => {
        if (isFade) return;

        reset(undefined, {
            keepValues: true,
        });
        startFadeAnimation();
        setIsRegister((value) => !value);
    };

    const hideModal = () => {
        dispatch(hideAuthModal());
    };

    const onLogin = async (data: IAuthForm) => {
        let res = await dispatch(
            isRegister ? registerUser(data) : loginUser(data)
        );

        if (res.meta.requestStatus === "fulfilled") {
            hideModal();
            navigate('/');
        }
    };

    return (
        <Modal
        
            title={!isRegister ? "Вход" : "Регистрация"}
            state={isShowAuthModal}
            closeModal={hideModal}
        >
            <div ref={contentRef} className="flex flex-col gap-2">
                <div
                    style={{ opacity: error ? 1 : 0 }}
                    className="min-h-[1.25rem] text-sm font-medium text-danger mb-1"
                >
                    {error}
                </div>
                <form
                    className="flex flex-col mb-1"
                    onSubmit={handleSubmit(onLogin)}
                >
                    <AuthInput
                        id="email"
                        className="mb-2"
                        inputClass="!bg-card-light"
                        placeholder="name@company.com"
                        label="Email"
                        error={formErrors.email?.message}
                        {...register("email", registerOptions.email)}
                    />
                    <AuthInput
                        id="password"
                        type="password"
                        className="mb-2"
                        inputClass="!bg-card-light"
                        placeholder="••••••••"
                        label="Пароль"
                        error={formErrors.password?.message}
                        {...register("password")}
                    />
                    {isRegister && (
                        <AuthInput
                            id="confirm_password"
                            type="password"
                            className="mb-2"
                            inputClass="!bg-card-light"
                            placeholder="••••••••"
                            label="Подтвердите пароль"
                            error={formErrors.confirm_password?.message}
                            {...register(
                                "confirm_password",
                                registerOptions.confirmPassword
                            )}
                        />
                    )}
                    <Button
                        className="mt-6 focus:ring-1 focus:outline-none focus:ring-blue-300"
                        loading={loading}
                        disabled={loading}
                        color="accent"
                        type="submit"
                    >
                        {isRegister ? "Регистрация" : "Вход"}
                    </Button>
                </form>
                <div className="flex px-1 justify-between text-sm font-medium">
                    <span>
                        {isRegister
                            ? "Уже есть аккаунт?"
                            : "Еще не зарегистрированы?"}
                    </span>
                    <TextButton onClick={toggleRegister} disabled={isFade}>
                        {isRegister ? "Войти" : "Зарегистрироваться"}
                    </TextButton>
                </div>
            </div>
        </Modal>
    );
};

export default AuthModal;

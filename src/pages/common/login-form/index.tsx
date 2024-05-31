import "./index.css";
import loginLogo from "../../../assets/images/login-form/download.png";
import { memo, useState } from "react";
import { AuthApi } from "../../../api/common/auth.api";
import { useNotification } from "../../../components/notification-base/NotificationTemplate";
import { t } from "i18next";
import { TYPE_MANAGEMENT } from "../../../interface/constants/type/Type.const";
import { useGlobalLoading } from "../../../components/global-loading/GlobalLoading";
import { setToken } from "../../../helper/userToken";
import { useNavigate } from "react-router-dom";
import { ROUTER_BASE } from "../../../router/router.constant";

function LoginFormTemplate() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { openNotification } = useNotification();
  const { setLoading } = useGlobalLoading();

  const loginSubmit = () => {
    if (!username || !password) {
      openNotification(
        "error",
        t("common.notification.error"),
        t("base.common.login.error.isNull")
      );
      return;
    }
    setLoading(true);
      AuthApi.login({
        username: username,
        password: password
      }).then((respone) => {
        console.log(respone);
        setToken(respone.data.data, false);
        
        navigate(
          `${ROUTER_BASE.objectManagement.path}`
        )
        openNotification(
          "success",
          t("common.notification.success"),
          t("base.common.login.success")
        );
        return;
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status === TYPE_MANAGEMENT.STATUS_ERROR_400
        ) {
          if (
            error.response.data &&
            error.response.data.status === TYPE_MANAGEMENT.STATUS_ERROR_400
          ) {
            openNotification(
              "error",
              t("common.notification.error"),
              error.response.data.message
            );
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="w-mx-auto">
              <img src={loginLogo} />
            </div>
            <div className="mt-5 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">

                <div className="mx-auto max-w-xs">
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="username"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                  <button onClick={() => loginSubmit()} className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-">Sign In</span>
                  </button>
                </div>

                <div className="my-8 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign In with Cartesian E-mail
                  </div>
                </div>

                <div className="flex items-center mx-auto max-w-xs">
                  {/* Loign Google */}
                  <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white p-2 rounded-full">
                      <img
                        className="max-w-[25px]"
                        src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                        alt="Google"
                      />
                    </div>
                  </button>

                  {/* Login Facebook */}
                  <button className="mx-3 w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white p-2 rounded-full">
                      <img
                        className="max-w-[25px]"
                        src="https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/"
                        alt="Facebook"
                      />
                    </div>
                  </button>

                  {/* Login Linkedin */}
                  {/* <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white p-2 rounded-full">
                      <img
                        className="max-w-[25px]"
                        src="https://ucarecdn.com/95eebb9c-85cf-4d12-942f-3c40d7044dc6/"
                        alt="Linkedin"
                      />
                    </div>
                  </button> */}
                </div>
                
                <div className="flex items-center mx-auto max-w-xs">
                  
                <p className="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by Cartesian Kinetics 
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Terms of Service
                    </a>
                     and its 
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-green-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              id="background_login"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(LoginFormTemplate);

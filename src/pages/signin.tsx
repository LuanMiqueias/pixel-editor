import { Formik } from "formik";
import Head from "next/head";
import React from "react";
import styles from "../styles/signin.module.css";
import form from "../styles/components/form.module.css";
import * as Yup from "yup";
import { InputField } from "../components/inputField";
import api from "../services/api";
import { UserContext } from "../context/UserContext";
import { GlobalContext } from "../context/GlobalContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { CleanLayout } from "../layouts/clean";

export default function Signin() {
  const { signin, changeLoading, changeToken, loading } =
    React.useContext(UserContext);
  const { showMessage } = React.useContext(GlobalContext);
  const navigate = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>Pixel Art | Sign in</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@500;800&family=Press+Start+2P&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div className={`${styles.container_form} animation_show_top`}>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Digite um email valido!")
              .required("Email é obrigatorio!"),
            password: Yup.string().min(5).required("Senha é obrigatorio!"),
          })}
          onSubmit={async (data) => {
            const auth = await signin(data.email, data.password);
            if (auth) {
              navigate.push("/editor");
              showMessage("login");
            }
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className={form.form}>
              <header>
                <h1>Sign in</h1>
              </header>
              <main className={form.content_form}>
                <InputField
                  fieldName="email"
                  type="email"
                  placeholder="email"
                  image="/email.svg"
                  invalid={formik.touched.email && formik.errors.email && true}
                  error={formik.errors.email}
                  {...formik.getFieldProps("email")}
                />
                <InputField
                  fieldName="password"
                  type="password"
                  placeholder="password"
                  image="/password.svg"
                  invalid={
                    formik.touched.password && formik.errors.password && true
                  }
                  error={formik.errors.password}
                  {...formik.getFieldProps("password")}
                />
              </main>
              <button className={form.submit} type="submit" disabled={loading}>
                {loading ? <span className="loading"></span> : "Entrar"}
              </button>
              <Link href="/signup">
                <a className={form.btn_secondary}>
                  ou &nbsp; <span>crie uma conta</span>
                </a>
              </Link>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
Signin.getLayout = (page: React.ReactNode) => <CleanLayout children={page} />

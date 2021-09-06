import { Formik } from "formik";
import Head from "next/head";
import React from "react";
import styles from "../styles/signin.module.css";
import form from "../styles/components/form.module.css";
import * as Yup from "yup";
import { InputField } from "../components/inputField";
import api from "../services/api";
import { UserContext } from "../context/UserContext";
import Link from "next/link";
import { CleanLayout } from "../layouts/clean";

export default function Signup() {
  const { auth, signin } = React.useContext(UserContext);
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
            name: Yup.string().required("Nome é obrigatorio!"),
            email: Yup.string()
              .email("Digite um email valido!")
              .required("Email é obrigatorio!"),
            password: Yup.string().min(5).required("Senha é obrigatorio!"),
          })}
          onSubmit={async (data) => {
            const responce = await api.post("/user/signup", {
              name: data.name,
              email: data.email,
              password: data.password,
            });
            console.log(await responce);
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className={form.form}>
              <header>
                <h1>Sign in</h1>
              </header>
              <main className={form.content_form}>
                <InputField
                  fieldName="name"
                  type="text"
                  placeholder="name"
                  image="/user.svg"
                  invalid={formik.touched.name && formik.errors.name && true}
                  error={formik.errors.name}
                  {...formik.getFieldProps("name")}
                />
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
              <button className={form.submit} type="submit">
                Criar conta
              </button>
              <Link href="/signin">
                <a className={form.btn_secondary}>
                  ou &nbsp; <span>faça login</span>
                </a>
              </Link>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

Signup.getLayout = (page: React.ReactNode) => <CleanLayout children={page} />

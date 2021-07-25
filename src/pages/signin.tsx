import { Formik } from "formik";
import Head from "next/head";
import React from "react";
import styles from "../styles/signin.module.css";
import form from "../styles/components/form.module.css";
import * as Yup from "yup";
import { InputField } from "../components/inputField";

export default function Signin() {
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
            password: Yup.string().min(4).required("Senha é obrigatorio!"),
          })}
          onSubmit={() => {}}
        >
          {(formik) => (
            <form onSubmit={() => {}} className={form.form}>
              <header>
                <h1>Sign in</h1>
              </header>
              <main className={form.content_form}>
                <InputField fieldName="name" type="text" text="name" />
                <InputField fieldName="email" type="email" text="email" />
                <InputField
                  fieldName="password"
                  type="password"
                  text="password"
                />
              </main>
              <footer>
                <button className={form.submit}>Enviar</button>
              </footer>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

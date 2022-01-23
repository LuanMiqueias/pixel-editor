import React from "react";
import Head from "next/head";
import Link from "next/link";
// import styles from "../../styles/user.module.css";
import { DefaultLayout } from "../../layouts/default";

export default function User() {
  return (
    <div>

    </div>
  );
}

User.getLayout = (page: React.ReactNode) => <DefaultLayout children={page} />
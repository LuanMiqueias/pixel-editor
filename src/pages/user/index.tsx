import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/user.module.css";
import { CleanLayout } from "../../layouts/clean";
import { DefaultLayout } from "../../layouts/default";
import { UserContext } from "../../context/UserContext";

export default function User() {
  const router = useRouter()
  const { user } = React.useContext(UserContext);
  const [projectSelected, setProjectSelected] = React.useState(0);

  function changeProject(indexProject) {
    setProjectSelected(indexProject)
  }
  console.log(user)
  // console.log(user?.arts[0]?.image)
  return (
    <div className={styles.container}>
      <div className={styles.content} >
        <div className={styles.project_detail}>
          <div className={styles.project_detail_content} >
            <img src={user?.arts[projectSelected]?.image} alt="" className="animation_show_opacity" key={`image-${user?.arts[projectSelected]?._id}`} />
            <div className={styles.project_detail_info}>
              <h1 className="animation_show_opacity" key={`title-${user?.arts[projectSelected]?.title}`}>{user?.arts[projectSelected]?.title}</h1>
              <Link href={`editor/${user?.arts[projectSelected]?._id}`}>
                <a className={styles.project_detail_btn_open}>
                  Open Project
                </a>
              </Link>
              <div className={styles.project_detail_info_block}>
                <p>size</p>
                <h2 className="animation_show_opacity" key={user?.arts[projectSelected]?.size}>{user?.arts[projectSelected]?.size}x{user?.arts[projectSelected]?.size}</h2>
              </div>
              <div className={styles.project_detail_info_block}>
                <p>colors</p>
                <div className={`${styles.project_detail_colors}`} key={`${user?.arts[projectSelected]?._id}`}>
                  {user?.arts[projectSelected]?.colors.map(item => <span style={{ background: item }} className="animation_show_opacity" key={`image-${user?.arts[projectSelected]?._id}`}></span>)}
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className={styles.projects_card} key={`${user?.arts[projectSelected]?._id}`}>
          {user?.arts.map((art, index) => {
            return <div className={`animation_show_opacity ${styles.artItem}`} key={`card-image-${user?.arts[projectSelected]?._id}`} onClick={() => changeProject(index)} onDoubleClick={() => router.push(`editor/${art?._id}`)}>
              <img src={art.image} alt={art.title} width="100%" />
              <h2>{art.title}</h2>
            </div>
          })}
        </div>
      </div>
    </div >
  );
}

User.getLayout = (page: React.ReactNode) => <DefaultLayout children={page} />
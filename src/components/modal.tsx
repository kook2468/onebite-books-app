"use client";

import { ReactNode, useEffect, useRef } from "react";
import style from "./modal.module.css";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: ReactNode }) {
  // dialog html 태그는 꺼져있는 상태로 렌더링됨. 처음 렌더링 될때는 모달이 화면에 안보임. ref 사용해서 지정해줌.
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal(); //처음 렌더링 시 꺼져있으면 켜지도록 함
      dialogRef.current?.scrollTo({
        //모달 등장 시 스크롤 가장 상단에 위치하도록 설정.
        top: 0,
      });
    }
  }, []);

  // modal-root id를 갖는 DOM 요소 아래에 dialog 태그가 렌더링 될거임.
  return createPortal(
    <dialog
      // onClose : ESC 클릭 이벤트
      onClose={() => router.back()}
      onClick={(e) => {
        //모달의 바깥영역이 클릭된거면 뒤로가기
        if ((e.target as any).nodeName === "DIALOG") {
          //아직 ts에서 nodeName 속성을 지원하지 않아서 오류 발생. 간단히 as any 타입 단언으로 해결
          router.back();
        }
      }}
      className={style.modal}
      ref={dialogRef}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
}

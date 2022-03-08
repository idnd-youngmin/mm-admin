import { Close } from "@material-ui/icons";
import React from "react";
import { useMutation } from "react-apollo";
import { REMOVE_PRODUCT_BY_ADMIN } from "../apollo/gql/gql";

const Modal = ({ data, toggle, setToggle, refetch }) => {
  // console.log(data, "datadatadata");
  //   const handleClose = () => {
  //     console.log("헬론");
  //   };
  // REMOVE_PRODUCT_BY_ADMIN

  const [removeProduct, { data: confirm }] = useMutation(
    REMOVE_PRODUCT_BY_ADMIN,
    {
      fetchPolicy: "no-cache",
      onCompleted(confirm) {
        if (confirm) {
          refetch();
          setToggle(false);
        }
      },
    }
  );

  const onRemoveHandler = async (e) => {
    e.preventDefault();
    console.log(data.uuid, "모달 확인중@@@@!!");
    try {
      removeProduct({
        variables: {
          product_uuid: data.uuid,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="modal">
      <span className="modal__close" onClick={() => setToggle(false)}>
        <Close />
      </span>
      <div className="modal__left">
        <img
          src={`https://s3-idnd-prd-an2-pub.s3.ap-northeast-2.amazonaws.com/product/origin/${data.thumbnail_images[0].name}`}
          alt="Img"
        />
      </div>
      <div className="modal__right">
        <div className="product">
          <h2 className="product__title">{data.title}</h2>
          <h3 className="product__price">{data.price} MM</h3>
          <div className="product__infor">
            <div className="product__inforWrap">
              <h3 className="product__inforTitle"> 사용한 sw</h3>
              <ul className="product__list">
                {data.softwares.map((item) => (
                  <li className="product__item color">{item.name}</li>
                ))}
              </ul>
            </div>
            <div className="product__inforWrap">
              <h3 className="product__inforTitle">uuid</h3>
              <ul className="product__list">
                <li className="product__item">{data.uuid}</li>
              </ul>
            </div>
            <div className="product__inforWrap">
              <h3 className="product__inforTitle">게시일</h3>
              <ul className="product__list">
                <li className="product__item">2022-02-16</li>
              </ul>
            </div>
            <div className="product__inforWrap">
              <h3 className="product__inforTitle">용량</h3>
              <ul className="product__list">
                <li className="product__item">33 KB</li>
              </ul>
            </div>
          </div>
          <div className="product__buttonWrap">
            <button className="product__button">승인하기</button>
            <button className="product__button" onClick={onRemoveHandler}>
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

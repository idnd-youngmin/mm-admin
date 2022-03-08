import { Close } from "@material-ui/icons";
import React, { useState } from "react";
import { useMutation } from "react-apollo";
import {
  REWARD_COUPON,
  SETCREATOR_TIER,
  // CREATEORS_REQUEST_LIST,
} from "../apollo/gql/gql";

const AdminModal = ({ datas, toggle, setToggle }) => {
  const [coupon, setCoupon] = useState();
  const [selected, setSelected] = useState();
  const [rewardCoupon, { data: confirm }] = useMutation(REWARD_COUPON, {
    fetchPolicy: "no-cache",
    onCompleted(confirm) {
      if (confirm) {
      }
    },
  });
  const [creatorTier, { data: creatorTierData }] = useMutation(
    SETCREATOR_TIER,
    {
      fetchPolicy: "no-cache",
      // refetchQueries: [
      //   {
      //     query: CREATEORS_REQUEST_LIST,
      //     variables: {
      //       condition: {
      //         where: "status=1",
      //         order_by: {
      //           field: "created_at",
      //           order: "DESC",
      //         },
      //         offset: 0,
      //         limit: 10,
      //       },
      //     },
      //   },
      // ],
      onCompleted(creatorTierData) {
        if (creatorTierData) {
          console.log(creatorTierData, "creatorTierDatacreatorTierData");
        }
      },
    }
  );

  // if (loading) return "Loading...";
  // if (error) return "Error";

  // 쿠폰 발급
  const onCouponHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(coupon, "couponcoupon");
      rewardCoupon({
        variables: {
          user_uuid: datas.user.uuid,
          coupon_name: "free_coupon",
          count: parseFloat(coupon),
        },
      });
      setCoupon("");
    } catch (e) {
      console.log(e, "쿠폰 에러확인중");
    }
  };
  // 크리에이터 등급 수정
  const onSelecteHandler = (e) => {
    e.preventDefault();

    try {
      creatorTier({
        variables: {
          user_uuid: datas.user.uuid,
          tier: selected,
        },
      });
    } catch (e) {
      console.log(e, "크리에이터 등급 수정 오류");
    }
  };

  // 날짜 수정하기
  const time = (createdAt) => {
    const date = new window.Date(createdAt);
    const year = date.getFullYear();
    const month = "0" + (date.getMonth() + 1);
    const day = "0" + date.getDate();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " ";
  };

  return (
    <div className="modal">
      <span className="modal__close" onClick={() => setToggle(false)}>
        <Close />
      </span>
      <div className="modal__left">
        {/* <img
          src={`https://s3-idnd-prd-an2-pub.s3.ap-northeast-2.amazonaws.com/product/w_280/${data.thumbnail_images[0].name}`}
          alt="Img"
        /> */}
        {/* {console.log(data.thumbnail_images[0].name, "확인중@@@!!")} */}
      </div>
      <div className="modal__right">
        <div className="product">
          <h2 className="product__title">유저 정보</h2>
          <h3 className="product__price">{datas.user.nickname}</h3>
          <div className="product__infor">
            <div className="product__inforWrap">
              <h3 className="product__inforTitle">uuid</h3>

              <ul className="product__list">
                <li className="product__item">{datas.user.uuid}</li>
              </ul>
            </div>
            <div className="product__inforWrap">
              <h3 className="product__inforTitle">회원 등록일</h3>
              <ul className="product__list">
                <li className="product__item">{time(datas.created_at)}</li>
              </ul>
            </div>
            <div className="product__inforWrap">
              <h3 className="product__inforTitle">등급</h3>
              <ul className="product__list">
                <li className="product__item">{datas.tier}</li>
              </ul>
            </div>
            <div className="product__inforWrap">
              <h3 className="product__inforTitle">쿠폰</h3>
              <input
                type="number"
                value={coupon || ""}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button className="button" onClick={onCouponHandler}>
                쿠폰보내기
              </button>
            </div>
            <div className="product__inforWrap">
              <h3 className="product__inforTitle">등급올리기</h3>
              <select onChange={(e) => setSelected(e.target.value)}>
                <option value="0">0</option>
                <option value="A">1</option>
                <option value="B">2</option>
                <option value="C">3</option>
                <option value="D">4</option>
                {/* <option value="E">5</option> */}
              </select>
              <button className="button" onClick={onSelecteHandler}>
                등급올리기
              </button>
            </div>
          </div>

          {/* <div className="product__buttonWrap">
            <button className="product__button">승인하기</button>
            <button className="product__button">하하호호</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminModal;

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/sort-comp */
import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { AtInput, AtButton } from "taro-ui";

import Loading from "../../components/Loading";
// import { fetchSandboxList } from "../../../actions/lesson";

import "./lesson-paging.scss";

type LessonPagingStateProps = {};

type LessonPagingDispatchProps = {
  clearList: () => any;
  fetchList: () => any;
};

type LessonPagingOwnProps = {
  pagination: {
    page: number;
    perPage: number;
    totalPage: number;
    total: number;
    next: number;
    prev: number;
  };
  selectIndex?: number;
  loading: boolean;
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  onPageJumpClick: (page: any) => void;
  onLessonClick: (lesson, selectIndex) => void;
  lessons: any[];
  isDebug?: boolean;
};

type LessonPagingState = {};

type IProps = LessonPagingStateProps &
  LessonPagingDispatchProps &
  LessonPagingOwnProps;

interface LessonPaging {
  props: IProps | any;
}

/* @connect(
  ({ pagination }) => ({
    pagination
  }),
  dispatch => ({
    fetchList() {
      dispatch(fetchSandboxList());
    }
  })
) */
class LessonPaging extends Component {

  state = { value: 0};
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleLessonPagingCardClick = idx => {
    if (idx === 0) {
      Taro.navigateTo({
        url: `/pages/example-list/index`
      });
    } else {
      Taro.navigateTo({
        url: `/pages/lesson/sandbox`
      });
    }
  };

  handlePrevPage = e => {
    this.props.onPrevPageClick();
  };

  handleNextPage = e => {
    this.props.onNextPageClick();
  };

  setPageValue(val) {
    this.setState({value: val});
  }

  render() {
    const {
      loading,
      pagination,
      selectIndex = 0,
      lessons = [],
      isDebug = false,
      onPageJumpClick
    } = this.props;
    const { value } = this.state;
    const {
      page = 0,
      perPage = 10,
      totalPage = 0,
      total = 0,
      prev = 0,
      next = 0
    } = pagination || {};
    return (
      <View className="lesson-paging__container">
        {loading && <Loading loading={loading} loadingText="????????????..." />}
        {isDebug && (
          <View hidden={!isDebug} className="debug__console">
            <Text>{page}</Text>
            <Text>{perPage}</Text>
            <Text>{total}</Text>
            <Text>{totalPage}</Text>
            <Text>{prev}</Text>
            <Text>{next}</Text>
          </View>
        )}
        {totalPage > 20 && (
          <View className="jump-page">
            <Text>???:{totalPage}</Text>
            <AtInput
              customStyle={{ padding: "5rpx 0" }}
              name="page"
              type="digit"
              onChange={(v: number) => {
                this.setPageValue(v <= totalPage ? v : 0);
              }}
              value={`${value}`}
            ></AtInput>
            <AtButton
              size="small"
              onClick={() => {
                onPageJumpClick(value);
              }}
            >
              GO
            </AtButton>
          </View>
        )}
        <View className="pagination">
          <Button
            onClick={this.handlePrevPage.bind(this)}
            disabled={prev === 0}
            className="pagination__item page2first"
          >
            <View className="taro-text at-icon at-icon-chevron-left"></View>
          </Button>
          {lessons.map((e, idx) => (
            <Button
              key={`pg_${idx}`}
              onClick={() => {
                this.props.onLessonClick(e, idx);
              }}
              className={`pagination__item ${
                idx === selectIndex ? "pagination__item--active" : ""
              }`}
            >
              {idx + 1 + perPage * (page - 1)}
            </Button>
          ))}
          <Button
            onClick={this.handleNextPage.bind(this)}
            disabled={next === 0}
            className="pagination__item page2last"
          >
            <Text className="taro-text at-icon at-icon-chevron-right"></Text>
          </Button>
        </View>
      </View>
    );
  }
}

// #region ????????????
//
// ?????????????????????????????????????????? Taro.Component ?????????????????????????????? props ??????
// ?????????????????????????????? Ts ????????????????????? JSX ??????????????????
//
// #endregion

export default LessonPaging;

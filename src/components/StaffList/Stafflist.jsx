import {React, useEffect} from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { useSelector, useDispatch } from "react-redux";
import Card from '@mui/material/Card';
import { getMember } from '../../reducks/member/selectors'
import { fetchMember } from '../../reducks/member/operations'

/*--------------画面サイズ取得---------------*/

function getWindowSize() {
  let window_heigth = window.innerHeight;
  let window_width = window.innerWidth;

  return [window_heigth, window_width]
}

/*--------------リストの中身---------------*/

function renderRow({ data, index, style }) {
  /*--------------スタッフの情報---------------*/
  const { member_data, onClickFunction } = data;
  const name = member_data[index].name
  const id = member_data[index].id

  const Click = () => {//スタッフリストからスタッフを選択されたとき処理
    onClickFunction(id, name)
  }

  return (
    <ListItem style={style} key={index} onClick={Click} id={id} component="div" disablePadding>
      <ListItemButton>
        <ListItemText className="text_center" primary={name} />
      </ListItemButton>
    </ListItem>
  );
}

/*--------------リスト---------------*/

export default function Stafflist(props) {
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const member_data = getMember(selector)

  const onClickFunction = props.onClickFunction

  useEffect(() => {
    dispatch(fetchMember())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

/*--------------------描画されるリストのサイズを指定---------------------*/
  const window_size = getWindowSize()

  const box_height = window_size[0] * 0.5;
  const box_width = (window_size[1] > 500)? 350:window_size[1]* 0.7;

  const list_height = box_height * 0.9;
  const label_height = box_height * 0.1;


  return (
    <Card className="stafflist_content" style={{ width: box_width, height: box_height }}>
      <div className="stafflist_label " style={{ height: label_height }}>
        <p className="stafflist_label_p" >スタッフ一覧</p>
      </div>
      <div className="stafflist_list">
        <Box className='text_center' style={{ width: box_width, height: box_height }}>
          <FixedSizeList
            height={list_height}
            width={box_width}
            itemSize={46}
            itemData={{
              member_data,
              dispatch,
              onClickFunction
            }}
            itemCount={member_data.length}
          >
            {renderRow}
          </FixedSizeList>
        </Box>
      </div>
    </Card>
  );
}

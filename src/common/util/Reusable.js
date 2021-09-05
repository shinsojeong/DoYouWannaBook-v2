import { useState } from 'react';

export const department = [
    {value: '간호학과', label: '간호학과'},
    {value: '건축학과', label: '건축학과'},
    {value: '경영정보학과', label: '경영정보학과'},
    {value: '경영학과', label: '경영학과'},
    {value: '글로벌한국학과', label: '글로벌한국학과'},
    {value: '동물생명자원학과', label: '동물생명자원학과'},
    {value: '물리치료학과', label: '물리치료학과'},
    {value: '보건관리학과', label: '보건관리학과'},
    {value: '사회복지학과', label: '사회복지학과'},
    {value: '상담심리학과', label: '상담심리학과'},
    {value: '생활체육학과', label: '생활체육학과'},
    {value: '식품영양학과', label: '식품영양학과'},
    {value: '신학과', label: '신학과'},
    {value: '아트앤디자인학과', label: '아트앤디자인학과'},
    {value: '영어영문학부', label: '영어영문학부'},
    {value: '유아교육과', label: '유아교육과'},
    {value: '음악학과', label: '음악학과'},
    {value: '일본어학과', label: '일본어학과'},
    {value: '중국어학과', label: '중국어학과'},
    {value: '컴퓨터공학부', label: '컴퓨터공학부'},
    {value: '화학생명과학과', label: '화학생명과학과'},
    {value: '환경디자인원예학과', label: '환경디자인원예학과'},
    {value: '기초학문학부', label: '기초학문학부'},
    {value: '창의융복합학문학부', label: '창의융복합학문학부'},
    {value: '항공관광외국어학부', label: '항공관광외국어학부'},
    {value: '약학과', label: '약학과'},
    {value: '기초의약과학과', label: '기초의약과학과'},
    {value: '화학과', label: '화학과'},
    {value: '생명과학과', label: '생명과학과'},
    {value: '지능정보융합학부', label: '지능정보융합학부'},
    {value: '동물과학부', label: '동물과학부'},
    {value: '원예학과', label: '원예학과'},
    {value: '환경그린디자인학과', label: '환경그린디자인학과'},
    {value: 'IT융합공학과', label: 'IT융합공학과'},
    {value: '컴퓨터학부', label: '컴퓨터학부'},
    {value: '카메카트로닉스학과', label: '카메카트로닉스학과'},    
    {value: '커뮤니케이션디자인학과', label: '커뮤니케이션디자인학과'},
    {value: '미술컨텐츠학과', label: '미술컨텐츠학과'},
    {value: '중독재활전공', label: '중독재활전공'},
    {value: '한류콘텐츠전공', label: '한류컨텐츠전공'},
    {value: '중독심리전공', label: '중독심리전공'},
    {value: '정원디자인전공', label: '정원디자인전공'},
    {value: '공연예술콘텐츠전공', label: '공연예술콘텐츠전공'},
    {value: '운동재활전공', label: '운동재활전공'},
    {value: '미디어콘텐츠전공', label: '미디어콘텐츠전공'},
    {value: '건강운동학전공', label: '건강운동학전공'},
    {value: '자유전공학부', label: '자유전공학부'},
    {value: '교양성경과', label: '교양성경과'},
];

export const roomOp = [
    {value: '1', label: '제1열람실'},
    {value: '2', label: '제2열람실'},
    {value: '3', label: '제3열람실'}
];

export const bookshelfOp = [
    {value: '1', label: 'a-1 책장'},
    {value: '2', label: 'a-2 책장'},
    {value: '3', label: 'a-3 책장'},
    {value: '4', label: 'a-4 책장'},
    {value: '5', label: 'a-5 책장'},
    {value: '6', label: 'a-6 책장'},
    {value: '7', label: 'b-1 책장'},
    {value: '8', label: 'b-2 책장'},
    {value: '9', label: 'b-3 책장'},
    {value: '10', label: 'b-4 책장'},
    {value: '11', label: 'b-5 책장'},
    {value: '12', label: 'b-6 책장'},
    {value: '13', label: 'c-1 책장'},
    {value: '14', label: 'c-2 책장'},
    {value: '15', label: 'c-3 책장'},
    {value: '16', label: 'c-4 책장'},
    {value: '17', label: 'c-5 책장'},
    {value: '18', label: 'c-6 책장'},
    {value: '19', label: 'd-1 책장'},
    {value: '20', label: 'd-2 책장'},
    {value: '21', label: 'd-3 책장'},
    {value: '22', label: 'd-4 책장'},
    {value: '23', label: 'd-5 책장'},
    {value: '24', label: 'd-6 책장'},
];

export const shelfOp = [
    {value: '1', label: '선반 1'},
    {value: '2', label: '선반 2'},
    {value: '3', label: '선반 3'},
    {value: '4', label: '선반 4'}
];

export const option = department.sort((a,b) => {  //객체 정렬 형식 (오름차순), 실제로 import 시키는 값
    return a - b;
});


export const soor = [
    {value: 'desc', label: '내림차순'},
    {value: 'asc', label: '오름차순'}
];

export const sort = soor.sort((a,b) => {
    return a.value < b.value ? -1 : a.value > b.value ? 1 : 0;
});

//input state
export const useInput = (init) => {
    const [value, setValue] = useState(init);
    const onChange = (e) => {
         const {
              target: {value}
         } = e;
         setValue(value);
    };
    return { value, onChange };
}

export const useInputFile = (init) => {
    const [files, setFiles] = useState(init);
    const onChange = (e) => {
        const {
            target: {files}
        } = e;
        setFiles(files);
    };
    return { files, onChange }
}
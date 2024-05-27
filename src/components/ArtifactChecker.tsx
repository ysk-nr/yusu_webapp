import { useState } from "react";

import {
    Heading,
    Select,
    Option,
    NumberInput,
    // Box,
    Button,
    Stack,
    // VStack,
    HStack,
    // SimpleGrid,
    GridItem,
    SelectItem,
    
} from "@yamada-ui/react";

const scoreValues: { [key: string]: number[] } = {
    "攻撃力%": [4.1, 4.7, 5.3, 5.8],
    "防御力%": [5.1, 5.8, 6.6, 7.3],
    "HP%": [4.1, 4.7, 5.3, 5.8],
    "会心率": [2.7, 3.1, 3.5, 3.9],
    "会心ダメージ": [5.4, 6.2, 7.0, 7.8],
    "元素熟知": [16, 19, 21, 23],
    "元素チャージ効率": [4.5, 5.2, 5.8, 6.5],
    "はずれ": [0, 0, 0, 0]
};

const partNames: { key: string, label: string}[] = [
    { key: "flower", label: "生の花" },
    { key: "plume", label: "死の羽" },
    { key: "eon", label: "時の砂" },
    { key: "goblet", label: "空の杯" },
    { key: "circlet", label: "理の冠" },
];// key: 識別名, label: 表示名


const partMainOptions: { key: string, options: string[] }[] = [
    { key: "flower", options: ["HP"] },
    { key: "plume", options: ["攻撃力"] },
    { key: "eon", options: ["HP%", "攻撃力%", "防御力%", "元素熟知", "元素チャージ効率"] },
    { key: "goblet", options: ["HP%", "攻撃力%", "防御力%", "元素熟知", "元素チャージ効率"] },
    { key: "circlet", options: ["HP%", "攻撃力%", "防御力%", "元素熟知", "元素チャージ効率", "会心率", "会心ダメージ"] },
];

// ここまで作った段階でSelectItem[]を理解した。ここより前を作り直したほうが美しいが後回し
const subOptions: SelectItem[] = [
    // "攻撃力%", "防御力%", "HP%", "会心率", "会心ダメージ", "元素熟知", "元素チャージ効率"
    { value: "攻撃力%", label: "攻撃力%" },
    { value: "防御力%", label: "防御力%" },
    { value: "HP%", label: "HP%" },
    { value: "会心率", label: "会心率" },
    { value: "会心ダメージ", label: "会心ダメージ" },
    { value: "元素熟知", label: "元素熟知" },
    { value: "元素チャージ効率", label: "元素チャージ効率" },
    { value: "はずれ", label: "はずれ" },
];

// const subOptionsList: string[] = [
//     "攻撃力%", "防御力%", "HP%", "会心率", "会心ダメージ", "元素熟知", "元素チャージ効率", "はずれ", "はずれ", "はずれ"
// ];

// const possibleSubOptions: string[] = [
//     "攻撃力%", "攻撃力", "防御力%", "防御力", "HP%", "HP", "会心率", "会心ダメージ", "元素熟知", "元素チャージ効率"
// ];



const baseOptions: SelectItem[] = [
    { value: "HP", label: "HP" },
    { value: "攻撃力", label: "攻撃力" },
    { value: "防御力", label: "防御力" },
    { value: "元素熟知", label: "元素熟知" },
    { value: "元素チャージ効率", label: "元素チャージ効率" },
    { value: "会心のみ", label: "会心のみ" },
    { value: "攻撃力+HP", label: "攻撃力+HP" },
    // { value: "HP+熟知", label: "HP+熟知" }
];


function calculateScore(statusType: string, status_level: number): number {
    if (statusType == "攻撃力%") {
        return scoreValues["攻撃力%"][status_level - 1];
    } else if (statusType == "防御力%") {
        return scoreValues["防御力%"][status_level - 1] * 0.8;
    } else if (statusType == "HP%") {
        return scoreValues["HP%"][status_level - 1];
    } else if (statusType == "会心率") {
        return scoreValues["会心率"][status_level - 1] * 2;
    } else if (statusType == "会心ダメージ") {
        return scoreValues["会心ダメージ"][status_level - 1];
    } else if (statusType == "元素熟知") {
        return scoreValues["元素熟知"][status_level - 1] * 0.25;
    } else if (statusType == "元素チャージ効率") {
        return scoreValues["元素チャージ効率"][status_level - 1] * 0.9;
    } else if (statusType == "はずれ") {
        return scoreValues["はずれ"][status_level - 1];
    }
    return 0;
}

function simulateScore(status_list: string[], currentScore: number, goal_score: number, num_rolls: number, baseoption: string): [number, number, number, number] {
    let threeoptionflag: boolean = false;
    let count_over_goal_score: number = 0;
    let min_score: number = 100;
    let max_score: number = 0;
    let scores_sum: number = 0;
    let s_status_list: string[] = [];
    // status_listから計算に使うステータスだけを抽出
    for (let i = 0; i < status_list.length; i++) {
        if (status_list[i] == '攻撃力%' && (baseoption == "攻撃力" || baseoption == "攻撃力+HP")) {
            s_status_list.push("攻撃力%");
        } else if (status_list[i] == '防御力%' && baseoption == "防御力") {
            s_status_list.push("防御力%");
        } else if (status_list[i] == 'HP%' && (baseoption == "HP" || baseoption == "攻撃力+HP")) {
            s_status_list.push("HP%");
        } else if (status_list[i] == '会心率') {
            s_status_list.push("会心率");
        } else if (status_list[i] == '会心ダメージ') {
            s_status_list.push("会心ダメージ");
        } else if (status_list[i] == '元素熟知' && baseoption == "元素熟知") {
            s_status_list.push("元素熟知");
        } else if (status_list[i] == '元素チャージ効率' && baseoption == "元素チャージ効率") {
            s_status_list.push("元素チャージ効率");
        } else {
            s_status_list.push("はずれ");
        }
    }

    // 3オプの場合はフラグを立てる: ループ回数100倍
    if (status_list.length < 4) {
        threeoptionflag = true;
    }
    let loopnum: number = threeoptionflag ? 10000000 : 100000;

    // ループ回数分だけスコアをシミュレート
    for (let _ = 0; _ < loopnum; _++) {
        let total_score: number = currentScore;
        if (threeoptionflag) {
            // バグです new_statusはメインと3オプ以外のステータスをランダムに選ぶ
            let new_status: string = s_status_list[Math.floor(Math.random() * s_status_list.length)];
            if (new_status == '攻撃力%' && (baseoption == "攻撃力" || baseoption == "攻撃力+HP")) {
                s_status_list.push("攻撃力%");
            } else if (new_status == '防御力%' && baseoption == "防御力") {
                s_status_list.push("防御力%");
            } else if (new_status == 'HP%' && (baseoption == "HP" || baseoption == "攻撃力+HP")) {
                s_status_list.push("HP%");
            } else if (new_status == '会心率') {
                s_status_list.push("会心率");
            } else if (new_status == '会心ダメージ') {
                s_status_list.push("会心ダメージ");
            } else if (new_status == '元素熟知' && baseoption == "元素熟知") {
                s_status_list.push("元素熟知");
            } else if (new_status == '元素チャージ効率' && baseoption == "元素チャージ効率") {
                s_status_list.push("元素チャージ効率");
            } else {
                s_status_list.push("はずれ");
            }
            s_status_list.splice(Math.floor(Math.random() * s_status_list.length), 1);
        }
        for (let i = 0; i < num_rolls; i++) {
            let statusType: string = s_status_list[Math.floor(Math.random() * s_status_list.length)];
            let status_level: number = Math.floor(Math.random() * 4) + 1;
            total_score += calculateScore(statusType, status_level);
        }
        scores_sum += total_score;
        if (total_score >= goal_score) {
            count_over_goal_score++;
        }
        if (total_score < min_score) {
            min_score = total_score;
        }
        if (total_score > max_score) {
            max_score = total_score;
        }
    }
    let expected_value: number = scores_sum / loopnum;
    let probability: number = count_over_goal_score / loopnum;
    let min_score_reached_prob: number = 1 - (max_score - 1) / 100;
    // let average_score: number = scores_sum / loopnum;
    return [expected_value, probability, min_score_reached_prob, min_score];
}


const ArtifactChecker = () => {
    const [part, setPartArtifact] = useState(partNames[0].key);
    // partというstateが用意される
    // setPartArtifactという関数でしか変更できない
    // 変更例はsetPartArtifact("flower")など。引数に指定したものが代入される。

    const [subOp1, setSubOp1] = useState("");
    const [subOp1Value, setSubOp1Value] = useState(0);
    const [subOp2, setSubOp2] = useState("");
    const [subOp2Value, setSubOp2Value] = useState(0);
    const [subOp3, setSubOp3] = useState("");
    const [subOp3Value, setSubOp3Value] = useState(0);
    const [subOp4, setSubOp4] = useState("");
    const [subOp4Value, setSubOp4Value] = useState(0);

    const [level, setLevel] = useState(0);
    const [baseOption, setBaseOption] = useState("");
    const [goalScore, setGoalScore] = useState(0);

    function calculateInitialScore(status_list: string[] , suboptionValues: {type: string, value: number}[], baseOption: string){
        let score: number = 0;
        let targetStatus: string[] = [];

        // baseOptionによってtargetStatusを変更
        switch (baseOption) {
            case "攻撃力":
                targetStatus = ["攻撃力%", "会心率", "会心ダメージ"];
                break;
            case "防御力":
                targetStatus = ["防御力%", "会心率", "会心ダメージ"];
                break;
            case "元素熟知":
                targetStatus = ["元素熟知", "会心率", "会心ダメージ"];
                break;
            case "元素チャージ効率":
                targetStatus = ["元素チャージ効率", "会心率", "会心ダメージ"];
                break;
            case "会心のみ":
                targetStatus = ["会心率", "会心ダメージ"];
                break;
            case "攻撃力+HP":
                targetStatus = ["攻撃力%", "HP%", "会心率", "会心ダメージ"];
                break;
        
            default:
                break;
        }

        // status_listの各要素をスコアに可算(targetStatusに含まれるもののみ)
        for (let i=0; i<status_list.length; i++){

            // targetStatusに含まれないステータスは無視
            if(targetStatus.includes(status_list[i]) == false){
                console.log("calculateInitialScore: " + status_list[i] + "は無視");
                continue;
            }

            let statusType: string = status_list[i];
            let status_level: number = scoreValues[statusType].indexOf(suboptionValues[i].value) + 1;
            if(status_level == 0){// indexofが-1
                // 不正な値の時は最高レベルで
                status_level = 4;
            }

            console.log("calculateInitialScore:" + score)
            console.log("statusType: " + statusType + " status_level: " + status_level);
            // 不要なステをスコアに含めない
            score += calculateScore(statusType, status_level);
        }

        console.log("初期スコア: " + score);

        return score;
    }

    function simulate() {

        // score valueが適切な値か確認
        // valueがscoreValuesのリストの中にある必要がある
        // alert(part + " " + subOp1 + " " + subOp2 + " " + subOp3 + " " + subOp4);
        // alert(subOp1Value + " " + subOp2Value + " " + subOp3Value + " " + subOp4Value);

        // これいらないかも status_listで十分の可能性
        let suboptionValues: {type: string, value: number}[] = [];

        if (subOp1 != "") {
            suboptionValues.push({type: subOp1, value: subOp1Value});
        }
        if (subOp2 != "") {
            suboptionValues.push({type: subOp2, value: subOp2Value});
        }
        if (subOp3 != "") {
            suboptionValues.push({type: subOp3, value: subOp3Value});
        }
        if (subOp4 != "") {
            suboptionValues.push({type: subOp4, value: subOp4Value});
        }

        // status_list: サブオプションの名前のリスト
        let status_list: string[] = [];
        for(let i=0; i<suboptionValues.length; i++){
            status_list.push(suboptionValues[i].type);
        }

        
        let currentScore: number = calculateInitialScore(status_list,suboptionValues, baseOption);

        // あと何回強化されるか
        let num_rolls: number = Math.floor((20 - level) / 4) + 1;
        
        let [
            expected_value, 
            probability, 
            min_score_reached_prob, 
            min_score
        ] = simulateScore(status_list, currentScore, goalScore, num_rolls, baseOption);

        console.log("期待値: " + expected_value);
        console.log("目標スコア以上の確率: " + probability);
        console.log("最低スコアに到達する確率: " + min_score_reached_prob);
        console.log("最低スコア: " + min_score);
        
        alert("status_list:" + status_list.length + " level: " + level + " baseoption: " + baseOption + " goalscore " + goalScore+ " currentscore: " + currentScore);
    }
    

    return (
        <>
            <Heading size="3xl" as="h1">Artifact Checker</Heading>
            <Heading size="lg" as="h2" color="green.700">
                This is Yusu's Artifact Checker.
                <br/>
                collaborating with おりばー and 月魚
            </Heading>

            <br/>

            <Select 
                placeholder="聖遺物の部位を選択"
                // placeholderInOptions={false}
                w="md"
                onChange={(p) => {
                    setPartArtifact(partNames[partNames.findIndex(tmp => p == tmp.label)].key);
                }}
            >
                {
                    partNames.map(p => {
                        return (
                            <Option value={p.label}>{p.label}</Option>
                        )
                    })
                }
            </Select>

            <br/>

            {
                (() => {
                    let options: string[] = [];
                    switch (part) {
                        case partNames[0].key:// 花
                            // 花はHPのみ
                            options = partMainOptions[partMainOptions.findIndex(tmp => partNames[0].key == tmp.key)].options;
                            break;
                        case partNames[1].key:// 羽
                            // 羽は攻撃力のみ
                            options = partMainOptions[partMainOptions.findIndex(tmp => partNames[1].key == tmp.key)].options;
                            break;
                        case partNames[2].key:// 時の砂
                            // HP%, 攻撃力%, 防御力%, 元素熟知, 元素チャージ効率
                            options = partMainOptions[partMainOptions.findIndex(tmp => partNames[2].key == tmp.key)].options;
                            break;
                        case partNames[3].key:// 空の杯
                            // 攻撃力%, 防御力%, 元素熟知, 元素チャージ効率
                            options = partMainOptions[partMainOptions.findIndex(tmp => partNames[3].key == tmp.key)].options;
                            break;
                        case partNames[4].key:// 理の冠
                            // HP%, 攻撃力%, 防御力%, 元素熟知, 元素チャージ効率, 会心率, 会心ダメージ
                            options = partMainOptions[partMainOptions.findIndex(tmp => partNames[4].key == tmp.key)].options;
                            break;
                    
                        default:
                            break;
                    }
                    return (
                        <Select placeholder="メインオプションを選択(3opの場合は必須)"  w="md" >
                            {
                                options.map((op) => {
                                    return <Option value={op}>{op}</Option>
                                })
                            }
                        </Select>
                    )
                })()
            } 

            <br/>

            <Stack>
                <GridItem>
                    <HStack>
                        <Select 
                            placeholder="サブオプション1"
                            placeholderInOptions={false}
                            w="md"
                            items={subOptions}
                            onChange={(op) => {
                                setSubOp1(op);
                            }}
                        ></Select>
                        <NumberInput
                            placeholder="サブオプションの数値"
                            w="0.7md"
                            step={0.1}
                            onChange={(value) => {
                                let tmp = parseFloat(value);
                                setSubOp1Value(tmp);
                            }}
                        ></NumberInput>
                    </HStack>
                </GridItem>
                <GridItem>
                    <HStack>
                        <Select
                            placeholder="サブオプション2"
                            placeholderInOptions={false}
                            w="md"
                            items={subOptions}
                            onChange={(op) => {
                                setSubOp2(op);
                            }}
                        ></Select>
                        <NumberInput
                            placeholder="サブオプションの数値"
                            w="0.7md"
                            step={0.1}
                            onChange={(value) => {
                                let tmp = parseFloat(value);
                                setSubOp2Value(tmp);
                            }}
                        ></NumberInput>
                    </HStack>
                </GridItem>
                <GridItem>
                    <HStack>
                        <Select
                            placeholder="サブオプション3"
                            placeholderInOptions={false}
                            w="md"
                            items={subOptions}
                            onChange={(op) => {
                                setSubOp3(op);
                            }}
                        ></Select>
                        <NumberInput
                            placeholder="サブオプションの数値"
                            w="0.7md"
                            step={0.1}
                            onChange={(value) => {
                                let tmp = parseFloat(value);
                                setSubOp3Value(tmp);
                            }}
                        ></NumberInput>
                    </HStack>
                </GridItem>
                <GridItem>
                    <HStack>
                        <Select
                            placeholder="サブオプション4"
                            placeholderInOptions={false}
                            w="md"
                            items={subOptions}
                            onChange={(op) => {
                                setSubOp4(op);
                            }}
                        ></Select>
                        <NumberInput
                            placeholder="サブオプションの数値"
                            w="0.7md"
                            step={0.1}
                            onChange={(value) => {
                                let tmp = parseFloat(value);
                                setSubOp4Value(tmp);
                            }}
                        ></NumberInput>
                    </HStack>
                </GridItem>
            </Stack>

            <br/>

            <NumberInput placeholder="レベルを入力" w="md"
                onChange={(value) => {
                    setLevel(parseInt(value));
                }}
            ></NumberInput>

            <br/>

            <Select placeholder="基準ステータスを選択"  w="md" items={baseOptions}
                onChange={(op) => {
                    setBaseOption(op);
                }}
            ></Select>

            <br/>

            <NumberInput placeholder="目標スコアを入力" w="md"
                onChange={(value) => {
                    setGoalScore(parseFloat(value));
                }}
            ></NumberInput>

            <br/>

            <Button onClick={simulate}>シミュレーション実行</Button>
        </>
    );

    //部位 select

    // 花羽以外はメインオプション選択 select 花羽は一択

    // サブオプション選択と値入力(4つ)  select/numberinput

    // レベル入力 numberinput 1-20

    // 基準ステータス選択 select

    // 目標スコア入力 numberinput

    // シミュレーション実行ボタン 
};

export default ArtifactChecker;
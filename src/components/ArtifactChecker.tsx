import {
    Heading,
    Select,
    NumberInput,
    // Box,
    Button,
    Stack,
    // VStack,
    HStack,
    // SimpleGrid,
    GridItem,
    
} from "@yamada-ui/react";

// const score_values: { [key: string]: number[] } = {
//     "攻撃力%": [4.1, 4.7, 5.3, 5.8],
//     "防御力%": [5.1, 5.8, 6.6, 7.3],
//     "HP%": [4.1, 4.7, 5.3, 5.8],
//     "会心率": [2.7, 3.1, 3.5, 3.9],
//     "会心ダメージ": [5.4, 6.2, 7.0, 7.8],
//     "元素熟知": [16, 19, 21, 23],
//     "元素チャージ効率": [4.5, 5.2, 5.8, 6.5],
//     "はずれ": [0, 0, 0, 0]
// };

const component_names: { label: string, value: string }[] = [
    { value: "flower", label: "生の花" },
    { value: "plume", label: "死の羽" },
    { value: "eon", label: "時の砂" },
    { value: "goblet", label: "空の杯" },
    { value: "circlet", label: "理の冠" },
];




// const main_options: { [key: string]: string[] } = {
//     "flower": ["HP"],
//     "plume": ["攻撃力"],
//     "eon": ["HP", "攻撃力", "防御力", "元素熟知", "元素チャージ効率"],
//     "goblet": ["攻撃力", "防御力", "元素熟知", "元素チャージ効率"],
//     "circlet": ["HP", "攻撃力", "防御力", "元素熟知", "元素チャージ効率", "会心率", "会心ダメージ"],
// };

// function calculate_score(status_type: string, status_level: number): number {
//     if (status_type == "攻撃力%") {
//         return score_values["攻撃力%"][status_level - 1];
//     } else if (status_type == "防御力%") {
//         return score_values["防御力%"][status_level - 1] * 0.8;
//     } else if (status_type == "HP%") {
//         return score_values["HP%"][status_level - 1];
//     } else if (status_type == "会心率") {
//         return score_values["会心率"][status_level - 1] * 2;
//     } else if (status_type == "会心ダメージ") {
//         return score_values["会心ダメージ"][status_level - 1];
//     } else if (status_type == "元素熟知") {
//         return score_values["元素熟知"][status_level - 1] * 0.25;
//     } else if (status_type == "元素チャージ効率") {
//         return score_values["元素チャージ効率"][status_level - 1] * 0.9;
//     } else if (status_type == "はずれ") {
//         return score_values["はずれ"][status_level - 1];
//     }
//     return 0;
// }

// function simulate_score(status_list: string[], current_score: number, goal_score: number, num_rolls: number, baseoption: string): [number, number, number, number] {
//     let threeoptionflag: boolean = false;
//     let count_over_goal_score: number = 0;
//     let min_score: number = 100;
//     let max_score: number = 0;
//     let scores_sum: number = 0;
//     let s_status_list: string[] = [];
//     for (let i = 0; i < status_list.length; i++) {
//         if (status_list[i] == '攻撃力%' && (baseoption == "攻撃力" || baseoption == "攻撃力+HP")) {
//             s_status_list.push("攻撃力%");
//         } else if (status_list[i] == '防御力%' && baseoption == "防御力") {
//             s_status_list.push("防御力%");
//         } else if (status_list[i] == 'HP%' && (baseoption == "HP" || baseoption == "攻撃力+HP")) {
//             s_status_list.push("HP%");
//         } else if (status_list[i] == '会心率') {
//             s_status_list.push("会心率");
//         } else if (status_list[i] == '会心ダメージ') {
//             s_status_list.push("会心ダメージ");
//         } else if (status_list[i] == '元素熟知' && baseoption == "元素熟知") {
//             s_status_list.push("元素熟知");
//         } else if (status_list[i] == '元素チャージ効率' && baseoption == "元素チャージ効率") {
//             s_status_list.push("元素チャージ効率");
//         } else {
//             s_status_list.push("はずれ");
//         }
//     }
//     if (status_list.length < 4) {
//         threeoptionflag = true;
//     }
//     let loopnum: number = threeoptionflag ? 10000000 : 100000;
//     for (let _ = 0; _ < loopnum; _++) {
//         let total_score: number = 0;
//         if (threeoptionflag) {
//             let new_status: string = s_status_list[Math.floor(Math.random() * s_status_list.length)];
//             if (new_status == '攻撃力%' && (baseoption == "攻撃力" || baseoption == "攻撃力+HP")) {
//                 s_status_list.push("攻撃力%");
//             } else if (new_status == '防御力%' && baseoption == "防御力") {
//                 s_status_list.push("防御力%");
//             } else if (new_status == 'HP%' && (baseoption == "HP" || baseoption == "攻撃力+HP")) {
//                 s_status_list.push("HP%");
//             } else if (new_status == '会心率') {
//                 s_status_list.push("会心率");
//             } else if (new_status == '会心ダメージ') {
//                 s_status_list.push("会心ダメージ");
//             } else if (new_status == '元素熟知' && baseoption == "元素熟知") {
//                 s_status_list.push("元素熟知");
//             } else if (new_status == '元素チャージ効率' && baseoption == "元素チャージ効率") {
//                 s_status_list.push("元素チャージ効率");
//             } else {
//                 s_status_list.push("はずれ");
//             }
//             s_status_list.splice(Math.floor(Math.random() * s_status_list.length), 1);
//         }
//         for (let i = 0; i < num_rolls; i++) {
//             let status_type: string = s_status_list[Math.floor(Math.random() * s_status_list.length)];
//             let status_level: number = Math.floor(Math.random() * 4) + 1;
//             total_score += calculate_score(status_type, status_level);
//         }
//         scores_sum += total_score;
//         if (total_score >= goal_score) {
//             count_over_goal_score++;
//         }
//         if (total_score < min_score) {
//             min_score = total_score;
//         }
//         if (total_score > max_score) {
//             max_score = total_score;
//         }
//     }
//     let expected_value: number = scores_sum / loopnum;
//     let probability: number = count_over_goal_score / loopnum;
//     let min_score_reached_prob: number = 1 - (max_score - 1) / 100;
//     let average_score: number = scores_sum / loopnum;
//     return [expected_value, probability, min_score_reached_prob, min_score];
// }


const ArtifactChecker = () => {
    return (
        <>
            <Heading size="3xl" as="h1">Artifact Checker</Heading>
            <Heading size="lg" as="h2" color="green.700">
                This is Yusu's Artifact Checker.
                <br/>
                collaborating with おりばー and 月魚
            </Heading>

            <br/>

            <Select placeholder="聖遺物の部位を選択" placeholderInOptions={false} items={component_names} w="md"></Select>

            <br/>

            <Select placeholder="メインオプションを選択"  w="md"></Select>

            <br/>

            <Stack>
                <GridItem>
                    <HStack>
                        <Select placeholder="サブオプション1" placeholderInOptions={false}  w="md"></Select>
                        <NumberInput placeholder="サブオプションの数値" w="0.7md"></NumberInput>
                    </HStack>
                </GridItem>
                <GridItem>
                    <HStack>
                        <Select placeholder="サブオプション2" placeholderInOptions={false}  w="md"></Select>
                        <NumberInput placeholder="サブオプションの数値" w="0.7md"></NumberInput>
                    </HStack>
                </GridItem>
                <GridItem>
                    <HStack>
                        <Select placeholder="サブオプション3" placeholderInOptions={false}  w="md"></Select>
                        <NumberInput placeholder="サブオプションの数値" w="0.7md"></NumberInput>
                    </HStack>
                </GridItem>
                <GridItem>
                    <HStack>
                        <Select placeholder="サブオプション4" placeholderInOptions={false}  w="md"></Select>
                        <NumberInput placeholder="サブオプションの数値" w="0.7md"></NumberInput>
                    </HStack>
                </GridItem>
            </Stack>

            <br/>

            <NumberInput placeholder="レベルを入力" w="md"></NumberInput>

            <br/>

            <Select placeholder="基準ステータスを選択"  w="md"></Select>

            <br/>

            <NumberInput placeholder="目標スコアを入力" w="md"></NumberInput>

            <br/>

            <Button>シミュレーション実行</Button>
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
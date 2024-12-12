import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { getClass, updateScore, groupClass, getScore } from "@/app/api/apis";
import {
  Class,
  MatchUpdate,
  RoundUpdate,
  ScoreUpdateRequest,
} from "@/interface/types"; // 引入你的 TypeScript 類型

interface ClassDetailDialogProps {
  open: boolean;
  onClose: () => void;
  classId: string;
}

export default function ClassDetailDialog({
  open,
  onClose,
  classId,
}: ClassDetailDialogProps) {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [students, setStudents] = useState<string[]>([]);
  const [groups, setGroups] = useState<Record<string, string[]>[]>([]);
  const [matches, setMatches] = useState<MatchUpdate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [scores, setScores] = useState<Record<string, number>>({});

  // 取得課堂資料
  useEffect(() => {
    const fetchClassData = async () => {
      setLoading(true);
      try {
        const classData = await getClass(classId);
        setStudents(classData.enrolled_students);
        setGroups(classData.groups);
      } catch (error) {
        console.error("Failed to fetch class data", error);
      } finally {
        setLoading(false);
      }
    };

    if (classId && open) {
      fetchClassData();
    }
  }, [classId, open]);

  // 取得賽程資料
  useEffect(() => {
    const fetchScoreData = async () => {
      setLoading(true);
      try {
        const scoreData = await getScore(classId);
        setMatches(scoreData.matches || []);
      } catch (error) {
        console.error("Failed to fetch score data", error);
      } finally {
        setLoading(false);
      }
    };

    if (classId && open) {
      fetchScoreData();
    }
  }, [classId, open]);

  // 分隊
  const handleGroup = async () => {
    setLoading(true);
    try {
      const result = await groupClass(classId);
      setGroups((await getClass(classId)).groups);
    } catch (error) {
      console.error("Failed to group students", error);
    } finally {
      setLoading(false);
    }
  };

  // 更新分數
  const handleScoreSubmit = async () => {
    setLoading(true);

    // 構建分數更新請求
    const matchUpdateData: ScoreUpdateRequest = {
      matches: matches.map((match) => ({
        match_number: match.match_number,
        rounds: match.rounds.map((round) => ({
          round_number: round.round_number,
          scores: Object.keys(scores).reduce((acc, key) => {
            const [matchIndex, roundIndex] = key.split("-").map(Number);

            // 確保只更新當前比賽和回合的分數
            if (
              matchIndex === match.match_number - 1 &&
              roundIndex === round.round_number - 1
            ) {
              // 使用回合的隊伍名稱（這裡假設每回合都有兩隊）
              const teamName = `team${roundIndex === 0 ? "A" : "B"}`; // 可以根據實際情況調整
              acc[teamName] = scores[key]; // 更新對應隊伍的分數
            }
            return acc;
          }, {} as Record<string, number>),
        })),
      })),
    };

    try {
      await updateScore(classId, matchUpdateData);
      alert("Scores updated successfully!");
    } catch (error) {
      console.error("Failed to update scores", error);
    } finally {
      setLoading(false);
    }
  };

  // Tab 切換
  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  // 渲染分隊標籤
  const renderGroupsTab = () => {
    return (
      <Box>
        <h4>分隊結果</h4>
        {groups.length === 0 ? (
          <Button onClick={handleGroup} variant="contained" color="primary">
            開始分隊
          </Button>
        ) : (
          <ul>
            {groups.map((group, index) => (
              <Box key={index}>
                <h5>分隊 {index + 1}</h5>
                <ul>
                  {Object.keys(group).map((teamName) => (
                    <li key={teamName}>
                      <strong>{teamName}:</strong> {group[teamName].join(", ")}
                    </li>
                  ))}
                </ul>
              </Box>
            ))}
          </ul>
        )}
      </Box>
    );
  };

  // 渲染賽程表標籤
  const renderMatchesTab = () => {
    return (
      <Box>
        <h4>賽程表</h4>
        {matches.length === 0 ? (
          <div>沒有賽程資料</div>
        ) : (
          <div>
            {matches.map((match, matchIndex) => (
              <Box key={matchIndex} sx={{ marginBottom: "1rem" }}>
                <h5>比賽 {match.match_number}</h5>
                {match.rounds.map((round, roundIndex) => (
                  <div key={roundIndex}>
                    <TextField
                      label={`隊伍 ${roundIndex === 0 ? "A" : "B"} 分數`} // 動態顯示隊伍名稱
                      value={scores[`${matchIndex}-${roundIndex}`] || ""}
                      onChange={(e) =>
                        setScores({
                          ...scores,
                          [`${matchIndex}-${roundIndex}`]: Number(
                            e.target.value
                          ),
                        })
                      }
                    />
                  </div>
                ))}
              </Box>
            ))}
            <Button
              onClick={handleScoreSubmit}
              variant="contained"
              color="primary"
            >
              分數結算
            </Button>
          </div>
        )}
      </Box>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>課堂詳細資料</DialogTitle>
      <DialogContent>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="Class Details"
        >
          <Tab label="分隊" />
          <Tab label="賽程表" />
        </Tabs>
        {tabIndex === 0 && renderGroupsTab()}
        {tabIndex === 1 && renderMatchesTab()}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          關閉
        </Button>
      </DialogActions>
    </Dialog>
  );
}

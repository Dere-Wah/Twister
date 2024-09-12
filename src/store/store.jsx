import {create} from "zustand";


const useTwitterStore = create((set) => ({
    logged_in: false,
    username: null,
    followers: 100000,
    about: null,
    tutorial_completed: false,
    controversy_score: 0,
    tweets: [],
    refreshSeed: 0,
    game_over: 0,
    banned: 0,
    youtubed: false,
    pdffed: false,
    points: 0,
    login: (username) => set((state) => ({ logged_in: true,  username: username})),
    completeTutorial: () => set((state) => ({tutorial_completed: true})),
    createTweet: (tw) => set((state) => ({ tweets: state.tweets.concat(tw)})),
    addFollowers: (n) => set((state) => ({followers: Math.max(state.followers + n, 0)})),
    refresh: () => set((state) => ({refreshSeed: state.refreshSeed+1})),
    setControversy: (n) => set((state) => ({controversy_score: n})),
    setGameOver: (n) => set((state) => ({game_over: Math.max(-2, n)})),
    addBanned: (n) => set((state) => ({banned: Math.max(state.banned + n, 0)})),
    setYoutubed: () => set((state) => ({youtubed: true})),
    setPdffed: () => set((state) => ({pdffed: true})),
    addPoints: (n) => set((state) => ({points: state.points + n})),
    resetGame: () => set((state) => ({logged_in: false, username: null, followers: 100000, about: null, tutorial_completed: null,
        controversy_score: 0, tweets: [], refreshSeed: 0, game_over: 0, banned: 0, youtubed: false, points: 0, pdffed: false
    }))
}))


export default useTwitterStore;

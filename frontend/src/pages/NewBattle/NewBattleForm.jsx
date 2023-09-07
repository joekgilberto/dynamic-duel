import "./NewBattleForm.css"

export default funciton NewBattleForm(){
    <form className="super-one" onSubmit={handleFirstSubmit}>
        <input type="text" placeholder="Search your first super.." onChange={handleFirstChange} value={superOneTyping} />
        <button type="submit">Find first super</button>
        <SelectSuper superSearched={superSearched} setSuper={setSuper} battleSearched={battleSearched} setBattleSearched={setBattleSearched} setSuperTyping={setSuperTyping} thisSuper={thisSuper} />
    </form>
}
import json, datetime, os
SC=os.path.dirname(os.path.abspath(__file__))
TODAY=datetime.date.today().isoformat()

# Curated: drift_flag = "needs action before this repo can be shown or trusted".
# Security/privacy exposure, broken or misleading deploy, or a missing deliverable.
# Deliberately NOT set for ordinary doc rot, branch sprawl, or harmless unpushed work.
MATERIAL = {
 'liebestraum':'committed Firebase admin private key (verified) + plaintext API keys',
 'FamilyPlan':'public Pages build serves real household income (verified)',
 'coffee-chat-os':'.env.local tracked; 14 named third-party personal notes committed',
 'Arbeit_2025':'employer/personal documents; README falsely claims de-identified',
 'CV-Updates':'client-confidential named pursuits in repo',
 'hestia':'third-party email hardcoded in firestore.rules; real work unmerged on branch',
 'Janus':'.env tracked with no .gitignore rule',
 'vox-v2':'vite define would inline GEMINI_API_KEY into public bundle',
 'great-decoupling':'deliverable untracked; docs/*.html committed at 0 bytes',
 'psyche':'firebase.json serves public/ not dist/ — live site is not the app',
 'jarvis-core':'hosting root has no index.html — deploy publishes a blank site',
 'Iris':'docs/ build hardcoded to localhost:5000 — visitors see a backend error',
 'layer-up':'VITE_FIREBASE_ENABLED case mismatch — cloud sync never worked in prod',
 'static':'unpushed 80MB commit; pages.yml uploads path:. (would publish drafts/PDFs)',
 'HAUS':'demo mode fully built but workflow never sets VITE_DEMO — never deployed',
 'morpheus-dream-archive':'Pages build hard-fails without Firebase secrets; index.json empty',
 'template-pushup':'zero seed data — demo renders an empty tracker',
 'pantheon':'dayAdvance pins every visitor to Day 1 — embed shows one day forever',
 'theos':'never deployed; astro.config still holds placeholder site URL',
 'Ares':'non-standard entry point — Pages would not serve the real document',
 'ZEIT':'allowlist is client-side only but documented as access restriction',
}

results={}
import glob
for p in glob.glob(f"{SC}/results/*.json"):
    d=json.load(open(p)); results[d['dir']]=d

inv_path="/Users/benjaminhaddon/Github Repos/almanac/data/github-inventory.json"
inv=json.load(open(inv_path))
by={r['repo'].lower():r for r in inv['repos']}

def line(d,r):
    dm=r.get('demo_mode',{}) or {}; rd=r.get('readiness',{}) or {}
    p=[f"demo={dm.get('level','?')}", f"rec={r.get('recommendation','?')}"]
    t=dm.get('triggers',[])[:2]
    if t: p.append("trigger["+", ".join(t)+"]")
    st=rd.get('stack',[])[:3]
    if st: p.append("stack["+", ".join(st)+"]")
    s=" | ".join(p)
    one=(rd.get('one_liner') or '').strip()
    rat=(r.get('rationale') or '').strip()
    out=f"[{TODAY} portfolio audit] {s}"
    if one: out+=f" — {one}"
    if d in MATERIAL: out+=f" ACTION NEEDED: {MATERIAL[d]}."
    if rat: out+=f" {rat}"
    return out[:1200]

matched=0; unmatched=[]
for d,r in results.items():
    e=by.get(d.lower())
    if not e: unmatched.append(d); continue
    e['claude']['assessment']=line(d,r)
    e['claude']['last_audited']=TODAY
    e['claude']['drift_flag']= d in MATERIAL
    matched+=1

json.dump(inv, open(f"{SC}/github-inventory.updated.json","w"), indent=1)
print(f"matched {matched}/48, drift_flag set on {sum(1 for d in results if d in MATERIAL)}")
print("no almanac entry:", unmatched)

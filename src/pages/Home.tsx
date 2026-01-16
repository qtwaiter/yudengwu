import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/SectionHeader";
import { FormationCard } from "@/components/FormationCard";
import { ShareFab } from "@/components/ShareFab";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Assets import (Assuming they will be placed here)
import heroImg from "@/assets/hero.jpg";
import diagramImg from "@/assets/diagram.png";

// Content Data Structure
const SEASONS = [
  {
    id: "spring",
    title: "一、春鱼戏水",
    subtitle: "欢乐自由 · 生机勃勃",
    intro: "春季鱼类的生活习性，主要是表现鱼类在满江涟漪的春水中摇头摆尾、浮白跳跃，追逐浪花，玩乐活泼的生活。",
    formations: [
      {
        title: "进门阵（单龙出水）",
        category: "春季",
        description: "一般用于“鱼”出场的阵图，成单列。春鱼高高兴兴畅游春江，纵情戏水。至台前各鱼灯紧接不断地从高向左右作弧线状，急转翻身入水。",
        meaning: "寓意春鱼欢乐的情绪，展现流光溢彩的弧形光流。",
        militaryMeaning: "奇兵从中突入，深入“敌后”，然后迅速隐蔽，分割包围歼灭敌人。",
        imageUrl: "https://resource.dessix.io/cm8itzu0z00005t6aakoxc305/90c79121-6c76-4339-a38b-32f66510460a"
      },
      {
        title: "龙摆尾（烧香阵）",
        category: "春季",
        description: "全体“右双握”,快步跑动，转弯时做“侧身泛白”。不断地侧身泛白，“翻身”“渐高”“甩高”急速转变下沉入水。",
        meaning: "春鱼成群结队，逐浪戏水，表达了春鱼喜悦、自由、和谐的生活。",
        imageUrl: "https://resource.dessix.io/cm8itzu0z00005t6aakoxc305/3123b618-f0ef-43fc-8874-99ce70c024e6"
      },
      {
        title: "四角循",
        category: "春季",
        description: "四角两鱼相交，两灯必须高甩成弧线状，“派”过去相交！四边泛白，灯齐腰平，与四角成形，高低对比。",
        meaning: "表现鱼类欢乐美好的生活，对春的向往和热爱。",
        militaryMeaning: "奇兵突入“敌后”后，在运动中，分割围歼外转之敌。",
        imageUrl: "https://resource.dessix.io/cm8itzu0z00005t6aakoxc305/7dfa9203-140b-42e4-bb75-ef6c0f60b61c"
      },
      {
        title: "编禽阵",
        category: "春季",
        description: "两鱼相交泛白，动作整齐一致。相交速度先缓慢再逐渐加快，最后很快。闪烁起万片银光。",
        meaning: "尽情舒畅的效果，非常激动人心。",
        militaryMeaning: "黑夜，两军隐蔽，摸索前进，短兵相接。",
        imageUrl: "https://resource.dessix.io/cm8itzu0z00005t6aakoxc305/021a0e12-a3f6-4dd9-91fd-20f169a5becb"
      }
    ]
  },
  {
    id: "summer",
    title: "二、夏鱼跳滩",
    subtitle: "奋力拼搏 · 团结协作",
    intro: "夏日炎炎，一群群夏鱼成群结队朝着上游流下来的凉水竭力跳滩，去寻求凉水解暑，兴奋自信。",
    formations: [
      {
        title: "钩连循",
        category: "夏季",
        description: "夏鱼跳滩的基本阵图。四角和中间的鲤鱼翻滚，红彤彤灯弧不停翻滚，满台的流光溢彩。",
        meaning: "三五成群的夏鱼，由于热浪肆虐，团结一致，成群结队，奋力跳滩。",
        militaryMeaning: "骑兵突入敌后，分割围歼外围之敌，同时直插敌人中枢。",
        imageUrl: "https://resource.dessix.io/cm8itzu0z00005t6aakoxc305/822456d3-c120-4ab4-8f8f-59c6806ccddf"
      },
      {
        title: "柯三拗",
        category: "夏季",
        description: "三人按路线旋转，由慢渐快，最后三人像粘在一起，灯高高甩起，擦肩而过。",
        meaning: "酷似物理学中三个分子活动造型，意味天、地、人相互依存的规律。",
        militaryMeaning: "实行躲、闪、进、杀身法，搏击的训练。",
        imageUrl: "https://resource.dessix.io/cm8itzu0z00005t6aakoxc305/ad01ad40-2453-4663-a7ad-e1ecacd6d99b"
      },
      {
        title: "巡逻阵",
        category: "夏季",
        description: "众鱼灯成一大圆圈，依次穿插而过。每跑一圈依次带走一“鱼”，带完为止。",
        meaning: "意味着鲤鱼酷暑难忍，到处寻觅阴凉之处。",
        imageUrl: "https://resource.dessix.io/cm8itzu0z00005t6aakoxc305/2201534b-cedd-4119-8f76-73aaf7089e7c"
      },
      {
        title: "四面八方阵",
        category: "夏季",
        description: "豚、虾、蟾、蟹四丑角即兴表演。四支直队鱼灯迅速运动。",
        meaning: "刘基早期借鉴军事阵图“八门金锁阵”演变而来，鱼灯舞之瑰宝。",
        militaryMeaning: "豚、虾、蟾、蟹为侦察兵，四支突击队在侦察兵配合下迅速歼敌。",
        imageUrl: "https://resource.dessix.io/cm8itzu0z00005t6aakoxc305/4adda742-90a0-47a3-98b6-010f30613686"
      }
    ]
  },
  {
    id: "autumn",
    title: "三、秋鱼显籽",
    subtitle: "五谷丰登 · 繁衍兴旺",
    intro: "金秋大地，稻香鱼肥。“尝新饭”祈愿国泰民顺，五谷丰登。",
    formations: [
      {
        title: "秋鱼显籽",
        category: "秋季",
        description: "人鱼面朝红珠，鱼灯侧身“泛白”。虾、豚扮演敌侦察兵在两队外侧跳着小跳步，向红珠口吹哨。",
        meaning: "秋鱼生活写照。寓意蛰伏水浒草丛中，候待显籽。",
        militaryMeaning: "虾、豚为敌侦察兵，知我进行侦察与反侦察斗争。",
        imageUrl: "https://resource.dessix.io/cm8itzu0z00005t6aakoxc305/0438c56c-349c-4bad-9858-58dbe0df1a85"
      },
      {
        title: "鲤鱼抢珠循",
        category: "秋季",
        description: "四鱼头各自慢慢向珠靠近，做碰珠抢珠。全体一起做“高跃”。",
        meaning: "龙的传人，必须要抢得红珠，才能得道成仙，民族才会强大。",
        imageUrl: "https://resource.dessix.io/cm8itzu0z00005t6aakoxc305/f3e423b7-5752-4a98-85ce-0b61cd6893cf"
      },
      {
        title: "钢剪循（剪刀阵）",
        category: "秋季",
        description: "按“∞”形路线跑，在交叉点依次做“高跃”穿插而过。",
        meaning: "刘基早期将“一字长蛇阵”化开后，形成大包围的阵图。",
        imageUrl: "https://resource.dessix.io/cm8itzu0z00005t6aakoxc305/e7b049b9-8bb6-4a7f-bb66-fe1003cecc14"
      }
    ]
  },
  {
    id: "winter",
    title: "四、冬鱼结龙",
    subtitle: "抱团御寒 · 众志成城",
    intro: "冬天寒风呼啸，万物蛰伏冬眠，唯独鱼类沉入深潭，抱团成群抵御严寒。",
    formations: [
      {
        title: "稻桶阵",
        category: "冬季",
        description: "红珠领队向圆圈内慢步小跑，众灯高举，每圈相距要宽。",
        meaning: "增强团结一心，为战胜一切自然灾害和入侵之敌增添了无穷的决心和力量。",
        militaryMeaning: "由“十面埋伏阵”演变而来。",
        imageUrl: "https://resource.dessix.io/cm8itzu0z00005t6aakoxc305/d244a875-be92-45a5-88b8-5cc9be9cf15c"
      }
    ]
  },
  {
    id: "finale",
    title: "尾声：跳龙门",
    subtitle: "发奋图强 · 民族复兴",
    intro: "鲤鱼跳龙门，寄托先民们的愿望，成为青田鱼灯舞的主题思想。",
    formations: [
      {
        title: "跳龙门",
        category: "高潮",
        description: "最后几圈像暴风骤雨，排山倒海的气势！每灯跳过“龙门”后，一定要侧身“泛白”。",
        meaning: "激励族人为了生存，为了出人头地发奋图强！",
        imageUrl: "https://resource.dessix.io/cm8itzu0z00005t6aakoxc305/24fb30d1-61d0-4660-ab2c-ffc317ced094"
      },
      {
        title: "站门阵",
        category: "结束",
        description: "互搭成“门”，众灯穿过“门”时，做“高跃”。",
        meaning: "为民族复兴，更需要“众志成城”，团结一致，共同对敌！",
        imageUrl: "https://resource.dessix.io/cm8itzu0z00005t6aakoxc305/9dc6fe0c-3332-41ea-94ff-d5c3d8cee67e"
      }
    ]
  }
];

export default function Home() {
  const scrollToSeason = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary selection:text-white pb-20 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-border/50 h-16 flex items-center justify-center px-4">
        <div className="flex gap-2 md:gap-8 overflow-x-auto w-full max-w-4xl justify-start md:justify-center no-scrollbar">
          {SEASONS.map((season) => (
            <button
              key={season.id}
              onClick={() => scrollToSeason(season.id)}
              className="whitespace-nowrap px-3 py-1 text-sm font-bold text-muted-foreground hover:text-primary transition-colors font-serif"
            >
              {season.title.split("、")[1] || season.title}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Background Image Placeholder - will be replaced by actual image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-10"></div>
          <img 
            src={heroImg} 
            alt="青田鱼灯舞" 
            className="w-full h-full object-cover opacity-90 scale-105 animate-in fade-in duration-1000"
          />
        </div>
        
        <div className="relative z-20 max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="mb-4 text-white border-white/50 text-lg py-1 px-4 bg-black/20 backdrop-blur-sm">
              非物质文化遗产
            </Badge>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black text-white drop-shadow-lg font-serif tracking-tight"
            style={{ textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
          >
            青田鱼灯舞
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto drop-shadow-md"
          >
            舞鱼灯之魂，传四季之韵
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-white/80"
          >
            <ArrowDown className="w-8 h-8" />
          </motion.div>
        </div>
      </section>

      {/* Intro Quote Section */}
      <section className="py-20 px-4 max-w-3xl mx-auto text-center relative">
        <div className="absolute top-10 left-10 text-9xl text-accent/10 font-serif leading-none">“</div>
        <blockquote className="text-2xl md:text-3xl font-serif leading-relaxed text-foreground/80 italic relative z-10">
          鱼灯舞的好不好，就在于舞的<span className="text-primary font-bold not-italic mx-2">“泛”</span>不泛。
          “泛”是鱼灯的韵味，是鱼灯舞之<span className="text-primary font-bold not-italic mx-2">灯魂</span>。
        </blockquote>
        <div className="mt-8 text-right text-muted-foreground font-serif">—— 郭秉强鱼灯舞手记</div>
        <div className="absolute bottom-10 right-10 text-9xl text-accent/10 font-serif leading-none rotate-180">“</div>
      </section>

      {/* Main Content - Seasons */}
      <div className="max-w-6xl mx-auto px-4 space-y-32">
        {SEASONS.map((season) => (
          <section key={season.id} id={season.id} className="scroll-mt-24">
            <SectionHeader title={season.title.split("、")[1] || season.title} subtitle={season.subtitle} />
            
            <div className="mb-12 text-center max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed">{season.intro}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
              {season.formations.map((formation, idx) => (
                <FormationCard 
                  key={idx}
                  index={idx}
                  {...formation}
                />
              ))}
            </div>
          </section>
        ))}

        {/* Diagram Full View Section */}
        <section className="py-12 bg-secondary/5 rounded-3xl p-8 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-repeat opacity-5 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMwMDAiLz48L3N2Zz4=')" }}></div>
            <h3 className="text-2xl font-serif font-bold mb-6 text-primary">全景阵法图解</h3>
            <p className="text-muted-foreground mb-8">点击查看高清全图，探索更多阵法细节</p>
            
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative cursor-zoom-in group-hover:shadow-2xl transition-all duration-500 rounded-xl overflow-hidden border-4 border-white shadow-lg max-w-4xl mx-auto">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 flex items-center justify-center">
                     <span className="bg-white/90 text-primary px-4 py-2 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 duration-300">
                        <Info className="w-4 h-4" /> 查看大图
                     </span>
                  </div>
                  <img src={diagramImg} alt="鱼灯舞阵法图解" className="w-full h-auto" />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] h-[90vh] p-0 overflow-hidden bg-black/95 border-none">
                <div className="w-full h-full overflow-auto flex items-center justify-center p-4">
                  <img src={diagramImg} alt="鱼灯舞阵法图解" className="max-w-none w-auto h-auto min-w-full" />
                </div>
              </DialogContent>
            </Dialog>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-32 py-12 bg-primary/5 border-t border-primary/10">
        <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">青田鱼灯舞</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              一项古老而充满生命力的非物质文化遗产。<br/>
              让我们共同守护这份流动的光影记忆。
            </p>
            <div className="flex justify-center gap-4 text-sm text-muted-foreground/60">
               <span>© 2026 鱼灯舞手记</span>
               <span>·</span>
               <span>资料来源：郭秉强老艺人手记</span>
            </div>
        </div>
      </footer>

      <ShareFab />
    </div>
  );
}

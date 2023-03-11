from sqlalchemy import (
    ARRAY,
    Column,
    Float,
    Integer,
    String,
    create_engine,
    delete,
    exc,
    select,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

Base = declarative_base()
engine = create_engine(
    "postgresql://capitolcapital:capitolcapital@capitolcapital.cdjnxytegtb2.us-east-1.rds.amazonaws.com:5432/capitolcapital"
)
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
mysession = scoped_session(Session)


# declare classes for database
class players(Base):  # type: ignore
    __tablename__ = "players"
    id = Column("id", String, primary_key=True)
    name = Column("name", String)
    position = Column("position", String)
    college = Column("college", String)
    weight = Column("weight", String)
    height = Column("height", Integer)
    birthdate = Column("birthdate", Float)
    headshot = Column("headshot", Float)
    jersey = Column("jersey", String)
    league = Column("league", String)
    # StocksTraded = Column("StocksTraded", ARRAY(String))
    # CommitteesMembership = Column("CommitteesMembership", ARRAY(String))

    def __init__(
        self,
        id,
        name,
        position,
        college,
        weight,
        height,
        birthdate,
        headshot,
        jersey,
        league,
    ):
        self.id = id
        self.name = name
        self.position = position
        self.Party = Party
        self.DateofBirth = DateofBirth
        self.FirstElected = FirstElected
        self.CashonHand = CashonHand
        self.Debt = Debt
        self.imgURL = imgURL
        self.profileURL = profileURL
        self.CommitteesMembership = CommitteesMembership
        self.StocksTraded = StocksTraded


class stocks(Base):  # type: ignore
    __tablename__ = "stocks"
    StockID = Column("StockID", String, primary_key=True)
    Name = Column("Name", String)
    StockPrice = Column("StockPrice", Float)
    MarketCap = Column("MarketCap", Float)
    Sector = Column("Sector", String)
    Industry = Column("Industry", String)
    imgUrl = Column("imgUrl", String)
    Logourl = Column("Logourl", String)
    Address = Column("Address", String)
    Description = Column("Description", String)
    TradedPoliticians = Column("TradedPoliticians", ARRAY(String))
    TradedCommittees = Column("TradedCommittees", ARRAY(String))

    def __init__(
        self,
        StockID,
        Name,
        StockPrice,
        MarketCap,
        Sector,
        Industry,
        imgUrl,
        Logourl,
        Address,
        Description,
        TradedPoliticians,
        TradedCommittees,
    ):
        self.StockID = StockID
        self.TradedCommittees = TradedCommittees
        self.Name = Name
        self.StockPrice = StockPrice
        self.MarketCap = MarketCap
        self.Sector = Sector
        self.Industry = Industry
        self.imgUrl = imgUrl
        self.Logourl = Logourl
        self.Address = Address
        self.Description = Description
        self.TradedPoliticians = TradedPoliticians


class committees(Base):  # type: ignore
    __tablename__ = "committees"
    CommitteesID = Column("CommitteesID", String, primary_key=True)
    Congress = Column("Congress", Integer)
    Name = Column("Name", String)
    Chamber = Column("Chamber", String)
    StartDate = Column("StartDate", String)
    URL = Column("URL", String)
    Chair = Column("Chair", String)
    NumberofMembers = Column("NumberofMembers", Integer)
    logoURL = Column("logoURL", String)
    imgUrl = Column("imgUrl", String)
    Members = Column("Members", ARRAY(String))
    StocksTraded = Column("StocksTraded", ARRAY(String))

    def __init__(
        self,
        CommitteesID,
        Congress,
        Name,
        Chamber,
        StartDate,
        URL,
        Chair,
        NumberofMembers,
        logoURL,
        imgUrl,
        Members,
        StocksTraded,
    ):
        self.CommitteesID = CommitteesID
        self.Congress = Congress
        self.Name = Name
        self.Chamber = Chamber
        self.StartDate = StartDate
        self.URL = URL
        self.Chair = Chair
        self.NumberofMembers = NumberofMembers
        self.logoURL = logoURL
        self.imgUrl = imgUrl
        self.Members = Members
        self.StocksTraded = StocksTraded


# declare Insert into
def addPolitician(
    PoliticianID,
    Name,
    Gender,
    Party,
    DateofBirth,
    FirstElected,
    CashonHand,
    Debt,
    imgURL,
    profileURL,
    StocksTraded,
    CommitteesMembership,
):
    try:
        Session = sessionmaker()
        Session.configure(bind=engine)
        session = Session()
        session.add(
            politicians(
                PoliticianID,
                Name,
                Gender,
                Party,
                DateofBirth,
                FirstElected,
                CashonHand,
                Debt,
                imgURL,
                profileURL,
                StocksTraded,
                CommitteesMembership,
            )
        )
        session.commit()
        session.close()
    except exc.SQLAlchemyError:
        print("Insertion Failed")


def addStocks(
    StockID,
    Name,
    StockPrice,
    MarketCap,
    Sector,
    Industry,
    imgUrl,
    Logourl,
    Address,
    Description,
    TradedPoliticians,
    TradedCommittees,
):
    try:
        Session = sessionmaker()
        Session.configure(bind=engine)
        session = Session()
        session.add(
            stocks(
                StockID,
                Name,
                StockPrice,
                MarketCap,
                Sector,
                Industry,
                imgUrl,
                Logourl,
                Address,
                Description,
                TradedPoliticians,
                TradedCommittees,
            )
        )
        session.commit()
        session.close()
    except exc.SQLAlchemyError:
        print("Insertion Failed")


def addCommittees(
    CommitteesID,
    Congress,
    Name,
    Chamber,
    StartDate,
    URL,
    Chair,
    NumberofMembers,
    logoURL,
    imgUrl,
    Members,
    StocksTraded,
):
    try:
        Session = sessionmaker()
        Session.configure(bind=engine)
        session = Session()
        session.add(
            committees(
                CommitteesID,
                Congress,
                Name,
                Chamber,
                StartDate,
                URL,
                Chair,
                NumberofMembers,
                logoURL,
                imgUrl,
                Members,
                StocksTraded,
            )
        )
        session.commit()
        session.close()
    except exc.SQLAlchemyError:
        print("Insertion Failed")


# drop everything in table
def dropAllRows():
    try:
        stmt = delete(committees)
        with engine.connect() as conn:
            conn.execute(stmt)
        stmt = delete(stocks)
        with engine.connect() as conn:
            conn.execute(stmt)
        stmt = delete(politicians)
        with engine.connect() as conn:
            conn.execute(stmt)
    except exc.SQLAlchemyError:
        print("Drop Failed")


# declare select
# selection will return a tuple containing each values from database
def getCommittees(start, end):
    try:
        t = ()
        stmt = select(committees).limit(int(end) - int(start)).offset(start)
        select
        with engine.connect() as conn:
            for row in conn.execute(stmt):
                t += (row,)
        return t
    except exc.SQLAlchemyError:
        print("Select Failed")


def getStocks(start, end):
    try:
        t = ()
        stmt = select(stocks).limit(int(end) - int(start)).offset(start)
        select
        with engine.connect() as conn:
            for row in conn.execute(stmt):
                t += (row,)
        return t
    except exc.SQLAlchemyError:
        print("Select Failed")


def getPoliticians(start, end):
    try:
        t = ()
        stmt = select(politicians).limit(int(end) - int(start)).offset(start)
        select
        with engine.connect() as conn:
            for row in conn.execute(stmt):
                t += (row,)
        return t
    except exc.SQLAlchemyError:
        print("Select Failed")


# Get a single value from database
def getPoliticiansbyID(val):
    try:
        t = ()
        stmt = select(politicians).where(politicians.PoliticianID == val)
        select
        with engine.connect() as conn:
            for row in conn.execute(stmt):
                t += (row,)
        return t
    except exc.SQLAlchemyError:
        print("Select Failed")


def getStocksbyID(val):
    try:
        t = ()
        stmt = select(stocks).where(stocks.StockID == val)
        select
        with engine.connect() as conn:
            for row in conn.execute(stmt):
                t += (row,)
        return t
    except exc.SQLAlchemyError:
        print("Select Failed")


def getCommitteesbyID(val):
    try:
        t = ()
        stmt = select(committees).where(committees.CommitteesID == val)
        select
        with engine.connect() as conn:
            for row in conn.execute(stmt):
                t += (row,)
        return t
    except exc.SQLAlchemyError:
        print("Select Failed")


# Get a connection from database
def getPoliticiansMembership(val):
    try:
        t = ()
        stmt = select(politicians.CommitteesMembership).where(
            politicians.PoliticianID == val
        )
        select
        with engine.connect() as conn:
            for row in conn.execute(stmt):
                t += (row,)
        return t
    except exc.SQLAlchemyError:
        print("Select Failed")


def getPoliticiansStock(val):
    try:
        t = ()
        stmt = select(politicians.StocksTraded).where(politicians.PoliticianID == val)
        select
        with engine.connect() as conn:
            for row in conn.execute(stmt):
                t += (row,)
        return t
    except exc.SQLAlchemyError:
        print("Select Failed")


def getstocksToCommittees(val):
    try:
        t = ()
        stmt = select(stocks.TradedCommittees).where(stocks.StockID == val)
        select
        with engine.connect() as conn:
            for row in conn.execute(stmt):
                t += (row,)
        return t
    except exc.SQLAlchemyError:
        print("Select Failed")


def getstocksToCPoliticians(val):
    try:
        t = ()
        stmt = select(stocks.TradedPoliticians).where(stocks.StockID == val)
        select
        with engine.connect() as conn:
            for row in conn.execute(stmt):
                t += (row,)
        return t
    except exc.SQLAlchemyError:
        print("Select Failed")


def getCommitteesMembership(val):
    try:
        t = ()
        stmt = select(committees.Members).where(committees.CommitteesID == val)
        select
        with engine.connect() as conn:
            for row in conn.execute(stmt):
                t += (row,)
        return t
    except exc.SQLAlchemyError:
        print("Select Failed")


def getComToStock(val):
    try:
        t = ()
        stmt = select(committees.StocksTraded).where(committees.CommitteesID == val)
        select
        with engine.connect() as conn:
            for row in conn.execute(stmt):
                t += (row,)
        return t
    except exc.SQLAlchemyError:
        print("Select Failed")


# for table creation
"""
#engine = create_engine('postgresql://capitolcapital:capitolcapital@capitolcapital1.cn948zvhvbtw.us-east-1.rds.amazonaws.com:5432/capitolcapital')
meta = MetaData()
test = Table(
    "politicians", meta,
    Column("PoliticianID", String, primary_key=True),
    Column("Name", String),
    Column("Gender", String),
    Column("Party", String),
    Column("DateofBirth", String),
    Column("FirstElected", Integer),
    Column("CashonHand", Float),
    Column("Debt", Float),
    Column("imgURL", String),
    Column("profileURL", String),
    Column("StocksTraded", ARRAY(String)),
    Column("CommitteesMembership", ARRAY(String))
)
test1 = Table(
    "stocks", meta,
    Column("StockID", String, primary_key=True),
    Column("Name", String),
    Column("StockPrice", Float),
    Column("MarketCap", Float),
    Column("Sector", String),
    Column("Industry", String),
    Column("imgUrl", String),
    Column("Logourl", String),
    Column("Address", String),
    Column("Description", String),
    Column("TradedPoliticians", ARRAY(String)),
    Column("TradedCommittees", ARRAY(String))
)
test2 = Table(
    "committees", meta,
    Column("CommitteesID", String, primary_key=True),
    Column("Congress", Integer),
    Column("Name", String),
    Column("Chamber", String),
    Column("StartDate", String),
    Column("URL", String),
    Column("Chair", String),
    Column("NumberofMembers", Integer),
    Column("logoURL", String),
    Column("imgUrl", String),
    Column("Members", ARRAY(String)),
    Column("StocksTraded", ARRAY(String))
)
meta.create_all(engine)
"""

# Insert Values
"""
addPolitician(engine,"A000370","Alma Adams","F","D","1946-05-27","1987",3593728.76,0,"https://adams.house.gov/sites/evo-subsites/adams.house.gov/files/styles/evo_image_large_960/public/evo-media-image/vi-hakeem-asa-smol.jpg?h=23fe37d3&itok=4527KvyK","https://adams.house.gov/sites/evo-subsites/adams-evo.house.gov/files/evo-media-image/Alma_Adams_official_portrait.jpg",["IBM", "TSLA"],["HSHA"])
addPolitician(engine,"B001230","Tammy Baldwin","F","D","1962-02-11","1999",3038018.37,0,"https://www.baldwin.senate.gov/assets/images/bgs/home-background-1.jpg","https://cdn.britannica.com/03/181903-050-6AF2FAD7/Tammy-Baldwin.jpg?w=400&h=300&c=crop",["IBM"],["HSHA", "HSAG", "HSSO"])
addPolitician(engine,"B001261","John Barrasso","M","R","1952-07-21","1995",5847520.42,0,"https://www.baldwin.senate.gov/assets/images/bgs/home-background-1.jpg","https://www.gannett-cdn.com/presto/2019/03/04/USAT/f2d892c7-857c-40d2-aed5-bae69688be75-green.oppose.JPG?width=660&height=440&fit=crop&format=pjpg&auto=webp",["IBM", "TSLA","NKE"],["HSHA"])

addStocks(engine,"IBM","International Business Machines",24.23,121541001000,"TECHNOLOGY","COMPUTER & OFFICE EQUIPMENT","https://www.techrepublic.com/wp-content/uploads/2022/05/ibm-announces-4000-qubits.jpeg","https://logo.clearbit.com/ibm.com","1 NEW ORCHARD ROAD, ARMONK, NY, US","International Business Machines Corporation (IBM) is an American multinational technology company headquartered in Armonk, New York, with operations in over 170 countries. The company began in 1911, founded in Endicott, New York, as the Computing-Tabulating-Recording Company (CTR) and was renamed International Business Machines in 1924. IBM is incorporated in New York. IBM produces and sells computer hardware, middleware and software, and provides hosting and consulting services in areas ranging from mainframe computers to nanotechnology. IBM is also a major research organization, holding the record for most annual U.S. patents generated by a business (as of 2020) for 28 consecutive years. Inventions by IBM include the automated teller machine (ATM), the floppy disk, the hard disk drive, the magnetic stripe card, the relational database, the SQL programming language, the UPC barcode, and dynamic random-access memory (DRAM). The IBM mainframe, exemplified by the System/360, was the dominant computing platform during the 1960s and 1970s.",["A000370","B001230", "B001261"], ["HSHA", "HSAG", "HSSO"] )
addStocks(engine,"TSLA","Tesla Inc",20.45,58778585000,"MANUFACTURING","MOTOR VEHICLES & PASSENGER CAR BODIES","https://tesla-cdn.thron.com/delivery/public/image/tesla/458cfaaf-de1e-47e0-867e-cb78c1993db3/bvlatuR/std/1200x628/Model-X-Social?quality=auto-medium&format=autoo","https://logo.clearbit.com/tesla.com","3500 DEER CREEK RD, PALO ALTO, CA, US","Tesla, Inc. is an American electric vehicle and clean energy company based in Palo Alto, California. Tesla's current products include electric cars, battery energy storage from home to grid-scale, solar panels and solar roof tiles, as well as other related products and services. In 2020, Tesla had the highest sales in the plug-in and battery electric passenger car segments, capturing 16% of the plug-in market (which includes plug-in hybrids) and 23% of the battery-electric (purely electric) market. Through its subsidiary Tesla Energy, the company develops and is a major installer of solar photovoltaic energy generation systems in the United States. Tesla Energy is also one of the largest global suppliers of battery energy storage systems, with 3 GWh of battery storage supplied in 2020.",["A000370","B001261"],["HSHA"] )
addStocks(engine,"NKE","Nike Inc",9.85,189524951000,"MANUFACTURING","RUBBER & PLASTICS FOOTWEAR","https://images.complex.com/complex/images/c_crop,h_507,w_901,x_50,y_40/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/mqomurtg7w9gg818ofof/nike-snkrs-box?fimg-ssr-default","https://logo.clearbit.com/nike.com","ONE BOWERMAN DR, BEAVERTON, OR, US","Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services. The company is headquartered near Beaverton, Oregon, in the Portland metropolitan area. It is the world's largest supplier of athletic shoes and apparel and a major manufacturer of sports equipment.",["B001261"],["HSHA"] )

addCommittees(engine, "HSHA",117, "Committee on Administration", "House", "1995-01-04T05:00:00Z", "https://cha.house.gov/", "", 46, "https://cha.house.gov/sites/evo-subsites/republicans-cha.house.gov/files/evo-media-image/2023_house_admin_offical_full_color.png", "https://cha.house.gov/sites/evo-subsites/cha.house.gov/files/styles/evo_image_full_width/public/evo-media-image/rotator-banner-6_0.png?h=0bfb9bfd&itok=TggWu9g-", ["A000370","B001230", "B001261"], ["IBM", "TSLA","NKE"])
addCommittees(engine,"HSAG",117, "Committee on Agriculture", "House", "2014-05-07T08:00:00Z", "https://agriculture.house.gov/", "", 42, "https://agriculture.house.gov/images/logo-2023.svg", "https://democrats-agriculture.house.gov/images/img-01.jpg", "A000370", "IBM")
addCommittees(engine,"HSSO",117, "Committee on Ethics", "House", "1998-04-21T07:00:00Z", "https://ethics.house.gov/", "", 36, "https://ethics.house.gov/sites/ethics.house.gov/files/logo-new_2.png", "https://oce.house.gov/sites/congressionalethics.house.gov/files/styles/congress_home_page_feature_rotator/public/home_page_feature/Capitol-Hill.jpg?itok=4ZOxlUIJ", ["A000370"], ["IBM"])
"""

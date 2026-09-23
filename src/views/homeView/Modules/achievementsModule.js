import {createEl} from "../../tools.js"

export default function createAchievementsSection(){
    //achievements block
        const achievSection = createEl("section", "", "achievements")
        achievSection.style.backgroundImage = `url(https://images-assets.nasa.gov/image/iss066e152101/iss066e152101~orig.jpg)`
    
        const infoContainer = createEl("div", "", "infoContainer")
        achievSection.append(infoContainer)
    
        //block 1
        const firstBlock = createEl("div", "", "innerInfoBlocks")
        infoContainer.append(firstBlock)
        firstBlock.append(createEl("span", "20", "accent"))
        firstBlock.append(createEl("span", " years of scientific activity", "textBlack"))
    
        //block 2
        const secondBlock = createEl("div", "", "specialCard")
        infoContainer.append(secondBlock)
        secondBlock.append(createEl("span", "2500+", "accent"))
        secondBlock.append(createEl("span", " scientific studies in astrophysics", "textWhite"))
    
        //block 3
        const thirdBlock = createEl("div", "", "innerInfoBlocks")
        infoContainer.append(thirdBlock)
        thirdBlock.append(createEl("span", "500+", "accent"))
        thirdBlock.append(createEl("span", "unmanned space flights", "textBlack"))
    
        const link = createEl("a", "More About Us", "accent")
        link.href = "/about"
        link.setAttribute("data-link", "")
        achievSection.append(link)

        return achievSection
}
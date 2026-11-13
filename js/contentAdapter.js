
class IContentProvider { async getChapter(chapterId) { throw new Error("Not implemented"); } }
class LocalJSONProvider extends IContentProvider {
    async getChapter(chapterId) {
        // Dynamic loading without manual routeMap
        const path = `data/${chapterId}.json`;
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Chapter file not found: ${path}`);
        return await response.json();
    }
}
class ContentAdapter {
    constructor() {
        this.provider = new LocalJSONProvider();
        this.cache = {};
    }
    async loadChapter(chapterId) {
        if (this.cache[chapterId]) return this.cache[chapterId];
        let data = null;
        try {
            const localData = localStorage.getItem('lse320_content');
            if (localData) {
                const parsed = JSON.parse(localData);
                const chapter = parsed.chapters.find(c => c.id === chapterId);
                if (chapter && !chapter.archived) {
                    console.log("[ContentAdapter] Loaded from Editor LocalStorage");
                    data = chapter;
                }
            }
        } catch(e) { console.warn("Editor data not found", e); }
        
        if (!data) {
            data = await this.provider.getChapter(chapterId);
        }
        this.validateSchema(data);
        this.cache[chapterId] = data;
        return data;
    }
    validateSchema(data) {
        if (!data.id || !data.flow || !data.contentVersion) {
            console.warn(`[ContentAdapter] Warning: Validation failed for chapter ${data.id}`);
        }
    }
}
const contentAdapter = new ContentAdapter();

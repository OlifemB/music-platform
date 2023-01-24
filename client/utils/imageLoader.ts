import paths from '@/utils/paths'

interface useImageProps {
    src: any,
    width?: number | string
    quality?: number | string
}

const useImage = ({src, width, quality}: useImageProps) => {
    return paths.server.root + '/' + src
};

export default useImage;